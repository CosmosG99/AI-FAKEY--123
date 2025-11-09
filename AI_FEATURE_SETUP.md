# OpenAI Integration Setup Guide

This guide explains how to configure OpenAI for fact-checking analysis in your backend.

## Overview

The backend uses OpenAI's API for fact-checking analysis. The AI service analyzes articles and provides veracity assessments with confidence scores and detailed explanations.

## Backend Configuration

### 1. Environment Variables

Add the following to your backend `.env` file:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4o-mini

# Other existing variables...
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 2. Environment Variable Details

- **OPENAI_API_KEY** (Required): Your OpenAI API key
  - Get your API key from: https://platform.openai.com/api-keys
  - Format: `sk-...`
  - Keep this secret and never commit it to version control
  
- **OPENAI_MODEL** (Optional): OpenAI model to use
  - Default: `gpt-4o-mini` (cost-effective and fast)
  - Alternatives: `gpt-4`, `gpt-4-turbo`, `gpt-3.5-turbo`
  - `gpt-4o-mini` is recommended for balance of cost and quality

### 3. Getting Your OpenAI API Key

1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new secret key
5. Copy the key (starts with `sk-`)
6. Add it to your `.env` file

**Important**: 
- Never share your API key publicly
- Never commit `.env` file to version control
- Add `.env` to `.gitignore`

## How It Works

### Request Flow

1. **Frontend** → Calls `/api/predictions` (POST) with `articleId`
2. **Backend Controller** → Fetches article from database
3. **AI Service** → Sends article to OpenAI with fact-checking prompt
4. **OpenAI** → Analyzes article and returns JSON response
5. **AI Service** → Parses and maps response to standard format
6. **Backend Controller** → Saves prediction to database
7. **Backend** → Returns prediction to frontend

### AI Analysis Process

The AI service:
1. Builds a comprehensive fact-checking prompt
2. Sends article data to OpenAI
3. Requests JSON-formatted response
4. Parses the response safely
5. Maps to standard format: `{ label, confidence, explanation, sentiment, evidenceLinks }`
6. Falls back to mock analysis if OpenAI fails

### Response Format

The AI returns:
- **label**: "true" | "false" | "uncertain"
- **confidence**: 0.0 to 1.0
- **explanation**: Detailed reasoning
- **sentiment**: "positive" | "negative" | "neutral"
- **evidenceLinks**: Array of supporting URLs (optional)

## Testing

### 1. Test OpenAI Connection

You can test if your API key works by checking the backend logs when generating a prediction. If configured correctly, you'll see OpenAI API calls in the logs.

### 2. Test Full Flow

1. Start backend: `cd AI-Fake-News-Checker--VissionMinds/backend/fakecheck-backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Register/Login
4. Submit article on Home page
5. Verify prediction is generated using OpenAI

### 3. Check Backend Logs

When you submit an article, check the backend console:
- ✅ Success: "Prediction generated successfully"
- ⚠️ Fallback: "Using fallback mock analysis - OpenAI service unavailable"
- ❌ Error: Check error messages for API key or quota issues

## Troubleshooting

### Issue: "OpenAI API key not configured"

**Solution**: 
- Check `OPENAI_API_KEY` in `.env` file
- Ensure the key starts with `sk-`
- Restart backend server after adding the key

### Issue: "Invalid or missing OpenAI API key"

**Solution**:
- Verify the API key is correct
- Check for extra spaces or quotes in `.env` file
- Ensure `.env` file is in the backend root directory

### Issue: "OpenAI rate limit exceeded"

**Solution**:
- You've hit OpenAI's rate limits
- Wait a few minutes and try again
- Consider upgrading your OpenAI plan
- Check your usage at https://platform.openai.com/usage

### Issue: "OpenAI API quota exceeded"

**Solution**:
- Your OpenAI account has no credits
- Add payment method at https://platform.openai.com/account/billing
- Check your usage and billing

### Issue: Predictions always show "Uncertain" with fallback message

**Solution**:
- OpenAI is not being called (check logs)
- API key might be invalid
- Check backend console for error messages
- Verify `.env` file is loaded correctly

### Issue: Slow response times

**Solution**:
- This is normal - OpenAI API calls take 2-10 seconds
- Consider using `gpt-4o-mini` for faster responses
- `gpt-4` is more accurate but slower and more expensive

## Cost Considerations

### Model Costs (as of 2024)

- **gpt-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **gpt-4**: ~$30 per 1M input tokens, ~$60 per 1M output tokens
- **gpt-3.5-turbo**: ~$0.50 per 1M input tokens, ~$1.50 per 1M output tokens

### Estimated Costs

For typical article analysis (~500 words):
- **gpt-4o-mini**: ~$0.0001-0.0003 per article
- **gpt-4**: ~$0.01-0.03 per article

**Recommendation**: Use `gpt-4o-mini` for production - it's cost-effective and provides good quality.

## Security Notes

✅ **API keys stored only in backend `.env`**  
✅ **Frontend never directly calls OpenAI**  
✅ **All AI requests go through backend**  
✅ **API key never exposed to frontend**  
✅ **Authentication required for all prediction endpoints**

## Frontend Integration

The frontend is already integrated! No changes needed.

The frontend calls:
- `POST /api/articles` - Submit article
- `POST /api/predictions` - Generate prediction (via `verifyService.ts`)
- `GET /api/predictions/article/:articleId` - Get prediction

All API calls are handled through:
- `frontend/src/services/articleService.ts`
- `frontend/src/services/predictionService.ts`
- `frontend/src/services/verifyService.ts`

## Next Steps

1. ✅ Get OpenAI API key from https://platform.openai.com/api-keys
2. ✅ Add `OPENAI_API_KEY` to backend `.env` file
3. ✅ (Optional) Set `OPENAI_MODEL` if you want a different model
4. ✅ Restart backend server
5. ✅ Test by submitting an article

## Support

If you encounter issues:
1. Check backend console logs for detailed error messages
2. Verify environment variables are set correctly
3. Test your OpenAI API key at https://platform.openai.com/playground
4. Check OpenAI status at https://status.openai.com/
