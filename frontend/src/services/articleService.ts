import api from './api';

export interface Article {
  _id: string;
  title?: string;
  content: string;
  url?: string;
  domain?: string;
  sourceReliabilityScore?: number;
  submittedBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface ArticleRequest {
  title?: string;
  content: string;
  url?: string;
  relatedArticles?: string[];
}

export interface ArticlesResponse {
  success: boolean;
  count: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  data: Article[];
}

// Submit a new article
export const submitArticle = async (data: ArticleRequest): Promise<Article> => {
  try {
    const response = await api.post('/articles', data);
    return response.data.data;
  } catch (error: any) {
    // Handle validation errors
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      const errorMessages = error.response.data.errors
        .map((err: any) => err.msg || err.message)
        .join(', ');
      throw new Error(errorMessages);
    }
    // Handle other errors
    throw new Error(error.response?.data?.message || 'Failed to submit article');
  }
};

// Get all articles
export const getArticles = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  domain?: string;
}): Promise<ArticlesResponse> => {
  try {
    const response = await api.get('/articles', { params });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch articles');
  }
};

// Get user's articles
export const getMyArticles = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<ArticlesResponse> => {
  try {
    const response = await api.get('/articles/my-articles', { params });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch your articles');
  }
};

// Get single article with prediction and feedback
export const getArticle = async (id: string): Promise<{
  article: Article;
  prediction: any;
  feedbacks: any[];
  feedbackStats: {
    total: number;
    upvotes: number;
    downvotes: number;
  };
}> => {
  try {
    const response = await api.get(`/articles/${id}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch article');
  }
};

// Extract domain from URL
export const extractDomain = async (url: string): Promise<{
  domain: string;
  sourceReliabilityScore: number;
  category?: string;
  verified?: boolean;
}> => {
  try {
    const response = await api.post('/articles/extract-domain', { url });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to extract domain');
  }
};

