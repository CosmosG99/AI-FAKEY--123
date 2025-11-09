import { submitArticle, getMyArticles, Article } from './articleService';
import { generatePrediction, getPredictionByArticle, Prediction } from './predictionService';
import { submitFeedback, getFeedbackByPrediction, Feedback } from './feedbackService';

export interface VerifyRequest {
  text?: string;
  url?: string;
}

// Helper function to map backend prediction labels to frontend format
const mapLabel = (label: string): 'true' | 'false' | 'uncertain' => {
  const normalized = label.toLowerCase();
  if (normalized.includes('true')) return 'true';
  if (normalized.includes('false')) return 'false';
  return 'uncertain';
};

export interface ExplainableAIData {
  suspiciousWords?: Array<{ word: string; count: number; context: string }>;
  sentiment?: 'positive' | 'negative' | 'neutral';
  sentimentScore?: number;
  biasIndicators?: string[];
  sourceReliabilityBreakdown?: {
    domainScore: number;
    contentScore: number;
    crossReferenceScore: number;
    overallScore: number;
  };
  languageAnalysis?: {
    sensationalismScore: number;
    credibilityScore: number;
    objectivityScore: number;
  };
}

export interface VerifyResponse {
  _id: string;
  userId?: string;
  text: string;
  url?: string;
  result: 'true' | 'uncertain' | 'false';
  confidence: number;
  explanation: string;
  sources?: string[];
  createdAt: string;
  articleId?: string;
  predictionId?: string;
  // Explainable AI data
  explainableAI?: ExplainableAIData;
}

export interface HistoryItem extends VerifyResponse {
  score?: number;
}

export interface CommunityPost extends VerifyResponse {
  upvotes: number;
  downvotes: number;
  comments: Array<{
    _id: string;
    userId: string;
    username: string;
    text: string;
    createdAt: string;
  }>;
}

// Verify news article - creates article, generates prediction
export const verifyNews = async (data: VerifyRequest): Promise<VerifyResponse> => {
  try {
    // Step 1: Submit article
    let articleData: { content: string; url?: string; title?: string } = {
      content: data.text || '',
    };

    // Add URL if provided
    if (data.url) {
      articleData.url = data.url;
    }

    // Validate content length (backend requires at least 50 characters)
    if (!articleData.content || articleData.content.trim().length < 50) {
      if (data.url) {
        // If URL provided but no text, use a placeholder that meets length requirement
        articleData.content = `Article content from ${data.url}. Please note: Full article content was not extracted. The source URL is: ${data.url}. This article requires manual review or content extraction from the provided URL.`;
      } else {
        throw new Error('Article content must be at least 50 characters long. Please provide more text for analysis.');
      }
    }

    const article = await submitArticle(articleData);

    // Step 2: Generate prediction
    let prediction: Prediction;
    try {
      prediction = await generatePrediction(article._id);
    } catch (error: any) {
      // If prediction generation fails, try to get existing one
      try {
        prediction = await getPredictionByArticle(article._id);
      } catch {
        throw new Error('Failed to generate or retrieve prediction');
      }
    }

    // Map prediction to VerifyResponse format
    const result: VerifyResponse = {
      _id: prediction._id,
      articleId: article._id,
      predictionId: prediction._id,
      userId: article.submittedBy._id,
      text: article.content,
      url: article.url,
      result: mapLabel(prediction.predictedLabel),
      confidence: prediction.confidenceScore,
      explanation: prediction.explanation,
      sources: prediction.evidenceLinks || [],
      createdAt: prediction.createdAt,
    };

    return result;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to verify news');
  }
};

// Get user verification history
export const getHistory = async (userId: string): Promise<HistoryItem[]> => {
  try {
    const articlesResponse = await getMyArticles({ limit: 100 });
    const articles = articlesResponse.data;

    // For each article, get its prediction
    const historyItems: HistoryItem[] = [];

    for (const article of articles) {
      try {
        const prediction = await getPredictionByArticle(article._id);
        historyItems.push({
          _id: prediction._id,
          articleId: article._id,
          predictionId: prediction._id,
          userId: article.submittedBy._id,
          text: article.content,
          url: article.url,
          result: mapLabel(prediction.predictedLabel),
          confidence: prediction.confidenceScore,
          explanation: prediction.explanation,
          sources: prediction.evidenceLinks || [],
          createdAt: prediction.createdAt,
        });
      } catch {
        // Skip articles without predictions
        continue;
      }
    }

    return historyItems.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch history');
  }
};

// Get community posts - all articles with predictions and feedback
export const getCommunityPosts = async (): Promise<CommunityPost[]> => {
  try {
    const { getArticles } = await import('./articleService');
    const articlesResponse = await getArticles({ limit: 50 });
    const articles = articlesResponse.data;

    const posts: CommunityPost[] = [];

    for (const article of articles) {
      try {
        const prediction = await getPredictionByArticle(article._id);
        const feedbackResponse = await getFeedbackByPrediction(prediction._id);

        // Map feedback to comments format
        const comments = feedbackResponse.data
          .filter((f: Feedback) => f.comment)
          .map((f: Feedback) => ({
            _id: f._id,
            userId: f.userId._id,
            username: f.userId.name,
            text: f.comment || '',
            createdAt: f.createdAt,
          }));

        posts.push({
          _id: prediction._id,
          articleId: article._id,
          predictionId: prediction._id,
          userId: article.submittedBy._id,
          text: article.content,
          url: article.url,
          result: mapLabel(prediction.predictedLabel),
          confidence: prediction.confidenceScore,
          explanation: prediction.explanation,
          sources: prediction.evidenceLinks || [],
          createdAt: prediction.createdAt,
          upvotes: feedbackResponse.statistics.upvotes,
          downvotes: feedbackResponse.statistics.downvotes,
          comments,
        });
      } catch {
        // Skip articles without predictions
        continue;
      }
    }

    return posts;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch community posts');
  }
};

// Upvote a verification (prediction)
export const upvoteVerification = async (predictionId: string): Promise<void> => {
  try {
    await submitFeedback({
      predictionId,
      vote: 'upvote',
    });
  } catch (error: any) {
    throw new Error(error.message || 'Failed to upvote');
  }
};

// Downvote a verification (prediction)
export const downvoteVerification = async (predictionId: string): Promise<void> => {
  try {
    await submitFeedback({
      predictionId,
      vote: 'downvote',
    });
  } catch (error: any) {
    throw new Error(error.message || 'Failed to downvote');
  }
};

// Add comment to verification (prediction)
export const addComment = async (predictionId: string, text: string): Promise<void> => {
  try {
    // Get user ID from localStorage
    const userDataStr = localStorage.getItem('fakecheck_user_data');
    const userData = userDataStr ? JSON.parse(userDataStr) : null;
    const userId = userData?._id;

    // First try to get existing feedback to update it
    if (userId) {
      try {
        const feedbackResponse = await getFeedbackByPrediction(predictionId);
        const existingFeedback = feedbackResponse.data.find(
          (f: Feedback) => f.userId._id === userId
        );

        if (existingFeedback) {
          // Update existing feedback with comment
          await submitFeedback({
            predictionId,
            vote: existingFeedback.vote,
            comment: text,
          });
          return;
        }
      } catch {
        // No existing feedback, create new one
      }
    }

    // Create new feedback with comment (default to upvote)
    await submitFeedback({
      predictionId,
      vote: 'upvote',
      comment: text,
    });
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add comment');
  }
};
