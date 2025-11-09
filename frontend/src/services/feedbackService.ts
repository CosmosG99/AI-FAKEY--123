import api from './api';

export interface Feedback {
  _id: string;
  predictionId: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  vote: 'upvote' | 'downvote';
  comment?: string;
  createdAt: string;
}

export interface FeedbackRequest {
  predictionId: string;
  vote: 'upvote' | 'downvote';
  comment?: string;
}

export interface FeedbackResponse {
  success: boolean;
  count: number;
  statistics: {
    upvotes: number;
    downvotes: number;
    total: number;
  };
  data: Feedback[];
}

// Submit feedback for a prediction
export const submitFeedback = async (data: FeedbackRequest): Promise<Feedback> => {
  try {
    const response = await api.post('/feedback', data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to submit feedback');
  }
};

// Get feedback for a prediction
export const getFeedbackByPrediction = async (predictionId: string): Promise<FeedbackResponse> => {
  try {
    const response = await api.get(`/feedback/prediction/${predictionId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch feedback');
  }
};

// Get user's feedback
export const getMyFeedback = async (): Promise<Feedback[]> => {
  try {
    const response = await api.get('/feedback/my-feedback');
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch your feedback');
  }
};

// Delete feedback
export const deleteFeedback = async (id: string): Promise<void> => {
  try {
    await api.delete(`/feedback/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete feedback');
  }
};

