# Frontend-Backend Integration Setup Guide

This guide will help you set up the frontend and backend connection.

## Prerequisites

- Node.js installed
- MongoDB database connection configured in backend

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd AI-Fake-News-Checker--VissionMinds/backend/fakecheck-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your configuration:
   ```
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:5000` by default.

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

   **Note:** If your backend runs on a different port, update the URL accordingly.

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

   Or if you're using the standard React scripts:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:5173` (Vite default) or `http://localhost:3000` (Create React App default).

## API Endpoints

The frontend is now connected to the following backend endpoints:

- **Authentication**: `/api/auth`
  - POST `/api/auth/register` - Register new user
  - POST `/api/auth/login` - Login user
  - GET `/api/auth/me` - Get current user

- **Articles**: `/api/articles`
  - POST `/api/articles` - Submit new article
  - GET `/api/articles` - Get all articles
  - GET `/api/articles/my-articles` - Get user's articles
  - GET `/api/articles/:id` - Get single article
  - POST `/api/articles/extract-domain` - Extract domain from URL

- **Predictions**: `/api/predictions`
  - POST `/api/predictions` - Generate prediction for article
  - GET `/api/predictions` - Get all predictions
  - GET `/api/predictions/:id` - Get single prediction
  - GET `/api/predictions/article/:articleId` - Get prediction by article

- **Feedback**: `/api/feedback`
  - POST `/api/feedback` - Submit feedback
  - GET `/api/feedback/prediction/:predictionId` - Get feedback for prediction
  - GET `/api/feedback/my-feedback` - Get user's feedback
  - DELETE `/api/feedback/:id` - Delete feedback

## CORS Configuration

CORS is configured in the backend to allow requests from the frontend origin (`http://localhost:5173` by default). If you're using a different port, update the `FRONTEND_URL` in the backend `.env` file.

## Troubleshooting

1. **CORS Errors**: Make sure the `FRONTEND_URL` in the backend `.env` matches your frontend URL.

2. **API Connection Errors**: 
   - Verify the backend is running on the correct port
   - Check that `VITE_API_BASE_URL` in the frontend `.env` matches your backend URL
   - Ensure both servers are running

3. **Authentication Issues**:
   - Make sure you're logged in before accessing protected routes
   - Check that the JWT token is being stored correctly in localStorage

4. **Database Connection**:
   - Ensure MongoDB is running and accessible
   - Verify the `MONGODB_URI` in the backend `.env` is correct

## Testing the Integration

1. Start both servers (backend and frontend)
2. Register a new user or login
3. Try verifying a news article on the Home page
4. Check your verification history
5. View community posts and interact with feedback

All API calls are now integrated and will communicate with the backend!

