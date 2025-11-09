require("dotenv").config();
const { OpenAI } = require("openai");

/**
 * AI Service - Uses OpenAI for fact-checking analysis
 * 
 * Environment Variables Required:
 * - OPENAI_API_KEY: Your OpenAI API key (required)
 * - OPENAI_MODEL: Optional, defaults to "gpt-4o-mini"
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// Initialize OpenAI client
const client = OPENAI_API_KEY ? new OpenAI({
  apiKey: OPENAI_API_KEY,
}) : null;

const aiService = {
  /**
   * Analyze article using OpenAI for fact-checking
   * @param {Object} articleData - Article data to analyze
   * @param {string} articleData.title - Article title
   * @param {string} articleData.content - Article content
   * @param {string} articleData.url - Article URL (optional)
   * @param {string} articleData.domain - Article domain (optional)
   * @param {number} articleData.sourceReliabilityScore - Source reliability score (0-1)
   * @returns {Promise<Object>} Analysis result with label, confidence, explanation, sentiment, evidenceLinks
   */
  analyzeArticle: async (articleData) => {
    try {
      // Validate required fields
      if (!articleData.content) {
        throw new Error('Article content is required');
      }

      // Check if OpenAI is configured
      if (!client) {
        console.warn("OpenAI API key not configured. Using fallback analysis.");
        return aiService.mockAnalysis(articleData);
      }

      // Build comprehensive fact-checking prompt with explainable AI data
      const prompt = `You are an expert fact-checker AI. Analyze the following news article and provide a comprehensive assessment with detailed breakdowns.

Article Title: ${articleData.title || 'No title provided'}
Article URL: ${articleData.url || 'No URL provided'}
Source Domain: ${articleData.domain || 'Unknown'}
Source Reliability Score: ${articleData.sourceReliabilityScore || 0.5} (0 = unreliable, 1 = highly reliable)

Article Content:
${articleData.content}

Analyze this article and provide your assessment in the following JSON format (respond ONLY with valid JSON, no additional text):
{
  "label": "true" | "false" | "uncertain",
  "confidence": 0.0-1.0,
  "explanation": "Detailed explanation of your analysis, including key factors that influenced your decision",
  "sentiment": "positive" | "negative" | "neutral",
  "sentimentScore": -1.0 to 1.0,
  "evidenceLinks": ["optional array of URLs or sources that support your assessment"],
  "suspiciousWords": [
    {"word": "example", "count": 2, "context": "appears in sensational context"}
  ],
  "biasIndicators": ["political bias", "emotional language", "lack of sources"],
  "sourceReliabilityBreakdown": {
    "domainScore": 0.0-1.0,
    "contentScore": 0.0-1.0,
    "crossReferenceScore": 0.0-1.0,
    "overallScore": 0.0-1.0
  },
  "languageAnalysis": {
    "sensationalismScore": 0.0-1.0,
    "credibilityScore": 0.0-1.0,
    "objectivityScore": 0.0-1.0
  }
}

Guidelines:
- "true": The article appears to be factually accurate and well-sourced
- "false": The article contains misinformation, false claims, or lacks credible sources
- "uncertain": Cannot determine with confidence, needs more verification
- confidence: Your confidence level (0.0 to 1.0) in your assessment
- explanation: Provide a clear, detailed explanation of your reasoning
- sentiment: Overall sentiment of the article content
- sentimentScore: -1.0 (very negative) to 1.0 (very positive)
- suspiciousWords: List words/phrases that indicate potential misinformation (clickbait, sensationalism, unverified claims)
- biasIndicators: List any detected biases (political, emotional, source bias, etc.)
- sourceReliabilityBreakdown: Score different aspects of source reliability
- languageAnalysis: Analyze language patterns for sensationalism, credibility, and objectivity

Consider:
1. Source credibility and reliability
2. Factual accuracy of claims
3. Presence of credible sources and citations
4. Language patterns (sensationalism, clickbait indicators)
5. Cross-referencing with known facts
6. Potential bias or misinformation indicators
7. Emotional language and tone
8. Use of unverified claims or conspiracy theories

Respond with ONLY the JSON object, no markdown formatting, no code blocks.`;

      // Call OpenAI API
      const response = await client.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [
          {
            role: "system",
            content: "You are a professional fact-checking AI. Always respond with valid JSON only, no additional text or formatting."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7, // Lower temperature for more consistent, factual responses
        max_tokens: 1000,
        response_format: { type: "json_object" } // Request JSON format
      });

      // Extract response text
      const outputText = response.choices[0]?.message?.content;
      
      if (!outputText) {
        throw new Error('No response from OpenAI');
      }

      // Parse JSON response
      let aiResponse;
      try {
        // Clean the response (remove markdown code blocks if present)
        const cleanedText = outputText
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();
        
        aiResponse = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error("Failed to parse OpenAI JSON response:", outputText);
        console.error("Parse error:", parseError.message);
        // Use fallback if parsing fails
        return aiService.mockAnalysis(articleData);
      }

      // Validate and map response to standard format
      return aiService.mapAIResponse(aiResponse);

    } catch (error) {
      console.error("AI Service Error:", error.message);
      
      // Handle specific OpenAI errors
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          console.error("Invalid or missing OpenAI API key. Check OPENAI_API_KEY in .env file.");
        } else if (error.message.includes('rate limit')) {
          console.error("OpenAI rate limit exceeded. Please try again later.");
        } else if (error.message.includes('insufficient_quota')) {
          console.error("OpenAI API quota exceeded. Please check your billing.");
        }
      }

      // Fallback to mock analysis on any error
      return aiService.mockAnalysis(articleData);
    }
  },

  /**
   * Map AI response to standard format expected by the application
   * @param {Object} aiResponse - Response from OpenAI
   * @returns {Object} Mapped response with all explainable AI data
   */
  mapAIResponse: (aiResponse) => {
    // Normalize label to match our enum values
    let normalizedLabel = 'Uncertain';
    const label = (aiResponse.label || '').toLowerCase().trim();
    
    if (label === 'true' || label.includes('true')) {
      normalizedLabel = 'Likely True';
    } else if (label === 'false' || label.includes('false')) {
      normalizedLabel = 'Likely False';
    } else {
      normalizedLabel = 'Uncertain';
    }

    // Ensure confidence is between 0 and 1
    let confidence = parseFloat(aiResponse.confidence);
    if (isNaN(confidence) || confidence < 0) confidence = 0;
    if (confidence > 1) confidence = 1;
    if (isNaN(confidence)) confidence = 0.5;

    // Get explanation
    let explanation = aiResponse.explanation || 'No explanation provided.';

    // Get sentiment
    let sentiment = (aiResponse.sentiment || 'neutral').toLowerCase();
    if (!['positive', 'negative', 'neutral'].includes(sentiment)) {
      sentiment = 'neutral';
    }

    // Get sentiment score
    let sentimentScore = parseFloat(aiResponse.sentimentScore);
    if (isNaN(sentimentScore) || sentimentScore < -1) sentimentScore = -1;
    if (sentimentScore > 1) sentimentScore = 1;
    if (isNaN(sentimentScore)) sentimentScore = 0;

    // Get suspicious words
    const suspiciousWords = Array.isArray(aiResponse.suspiciousWords)
      ? aiResponse.suspiciousWords.filter(w => w && w.word)
      : [];

    // Get bias indicators
    const biasIndicators = Array.isArray(aiResponse.biasIndicators)
      ? aiResponse.biasIndicators.filter(b => typeof b === 'string' && b.trim().length > 0)
      : [];

    // Get source reliability breakdown
    const sourceReliabilityBreakdown = aiResponse.sourceReliabilityBreakdown || {};
    const reliabilityBreakdown = {
      domainScore: Math.max(0, Math.min(1, parseFloat(sourceReliabilityBreakdown.domainScore) || 0.5)),
      contentScore: Math.max(0, Math.min(1, parseFloat(sourceReliabilityBreakdown.contentScore) || 0.5)),
      crossReferenceScore: Math.max(0, Math.min(1, parseFloat(sourceReliabilityBreakdown.crossReferenceScore) || 0.5)),
      overallScore: Math.max(0, Math.min(1, parseFloat(sourceReliabilityBreakdown.overallScore) || 0.5))
    };

    // Get language analysis
    const languageAnalysis = aiResponse.languageAnalysis || {};
    const langAnalysis = {
      sensationalismScore: Math.max(0, Math.min(1, parseFloat(languageAnalysis.sensationalismScore) || 0.5)),
      credibilityScore: Math.max(0, Math.min(1, parseFloat(languageAnalysis.credibilityScore) || 0.5)),
      objectivityScore: Math.max(0, Math.min(1, parseFloat(languageAnalysis.objectivityScore) || 0.5))
    };

    // Get evidence links
    const evidenceLinks = Array.isArray(aiResponse.evidenceLinks) 
      ? aiResponse.evidenceLinks.filter(link => typeof link === 'string' && link.trim().length > 0)
      : [];

    return {
      label: normalizedLabel,
      confidence: confidence,
      explanation: explanation,
      sentiment: sentiment,
      sentimentScore: sentimentScore,
      evidenceLinks: evidenceLinks,
      suspiciousWords: suspiciousWords,
      biasIndicators: biasIndicators,
      sourceReliabilityBreakdown: reliabilityBreakdown,
      languageAnalysis: langAnalysis
    };
  },

  /**
   * Fallback mock analysis when AI service is unavailable
   * @param {Object} articleData - Article data
   * @returns {Object} Mock analysis result
   */
  mockAnalysis: (articleData) => {
    console.warn("Using fallback mock analysis - OpenAI service unavailable");
    
    const content = (articleData.content || '').toLowerCase();
    const title = (articleData.title || '').toLowerCase();
    const combinedText = title + ' ' + content;

    const suspiciousWordsList = ['breaking', 'shocking', 'you won\'t believe', 'doctors hate', 'click here', 'miracle cure', 'guaranteed', 'exclusive', 'secret'];
    const foundSuspicious = suspiciousWordsList.filter(word => combinedText.includes(word));
    const suspiciousCount = foundSuspicious.length;

    let label = 'Uncertain';
    let confidence = 0.5;
    let sentiment = 'neutral';
    let sentimentScore = 0;

    if (articleData.sourceReliabilityScore > 0.7 && suspiciousCount < 2) {
      label = 'Likely True';
      confidence = 0.75;
      sentiment = 'positive';
      sentimentScore = 0.3;
    } else if (articleData.sourceReliabilityScore < 0.4 || suspiciousCount > 2) {
      label = 'Likely False';
      confidence = 0.7;
      sentiment = 'negative';
      sentimentScore = -0.4;
    }

    const explanations = {
      'Likely True': 'The article comes from a reliable source and contains factual information with minimal suspicious language.',
      'Likely False': 'The article shows signs of misinformation, including suspicious language patterns and/or unreliable source.',
      'Uncertain': 'Unable to determine with high confidence. More context or verification needed. Please configure OpenAI API key for accurate analysis.'
    };

    // Build suspicious words array with context
    const suspiciousWords = foundSuspicious.map(word => ({
      word: word,
      count: (combinedText.match(new RegExp(word, 'gi')) || []).length,
      context: 'appears in potentially sensational context'
    }));

    // Determine bias indicators
    const biasIndicators = [];
    if (suspiciousCount > 2) biasIndicators.push('sensational language');
    if (articleData.sourceReliabilityScore < 0.4) biasIndicators.push('unreliable source');
    if (content.includes('conspiracy') || content.includes('cover-up')) biasIndicators.push('conspiracy language');

    // Source reliability breakdown
    const sourceReliabilityBreakdown = {
      domainScore: articleData.sourceReliabilityScore || 0.5,
      contentScore: suspiciousCount < 2 ? 0.7 : 0.3,
      crossReferenceScore: 0.5,
      overallScore: articleData.sourceReliabilityScore || 0.5
    };

    // Language analysis
    const languageAnalysis = {
      sensationalismScore: Math.min(1, suspiciousCount * 0.2),
      credibilityScore: articleData.sourceReliabilityScore || 0.5,
      objectivityScore: suspiciousCount < 2 ? 0.7 : 0.4
    };

    return {
      label,
      confidence,
      explanation: explanations[label],
      sentiment,
      sentimentScore,
      evidenceLinks: [],
      suspiciousWords,
      biasIndicators,
      sourceReliabilityBreakdown,
      languageAnalysis
    };
  }
};

module.exports = aiService;
