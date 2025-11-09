import api from './api';

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

export interface Prediction {
  _id: string;
  articleId: string;
  predictedLabel: 'true' | 'false' | 'uncertain';
  confidenceScore: number;
  explanation: string;
  evidenceLinks?: string[];
  createdAt: string;
  article?: any;
  // Explainable AI data
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

export interface PredictionsResponse {
  success: boolean;
  count: number;
  data: Prediction[];
}

// Generate prediction for an article
export const generatePrediction = async (articleId: string): Promise<Prediction> => {
  try {
    const response = await api.post('/predictions', { articleId });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to generate prediction');
  }
};

// Get all predictions
export const getPredictions = async (): Promise<Prediction[]> => {
  try {
    const response = await api.get('/predictions');
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch predictions');
  }
};

// Get single prediction
export const getPrediction = async (id: string): Promise<Prediction> => {
  try {
    const response = await api.get(`/predictions/${id}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch prediction');
  }
};

// Get prediction by article ID
export const getPredictionByArticle = async (articleId: string): Promise<Prediction> => {
  try {
    const response = await api.get(`/predictions/article/${articleId}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch prediction');
  }
};

