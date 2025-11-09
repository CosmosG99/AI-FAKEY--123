# CORS and Connection Issues - Fixed

## Issues Found:
1. ✅ **CORS Error**: Backend only allowed `http://localhost:5173` but frontend runs on `http://localhost:3001`
2. ✅ **404 Error**: Registration endpoint not found (likely API URL issue)

## Fixes Applied:

### 1. Backend CORS Configuration (FIXED)
Updated `AI-Fake-News-Checker--VissionMinds/backend/fakecheck-backend/app.js` to allow multiple origins:
- `http://localhost:3000`
- `http://localhost:3001` ✅ (Your current port)
- `http://localhost:5173` (Vite default)
- `http://localhost:5174` (Vite alternate)
- Any origin in development mode

### 2. Next Steps - Verify Your Setup:

#### A. Check Frontend `.env` File
Make sure you have a `.env` file in the `frontend` directory with:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**To create it:**
```bash
cd frontend
echo VITE_API_BASE_URL=http://localhost:5000/api > .env
```

#### B. Restart Backend Server
After updating CORS, restart your backend:

```bash
cd AI-Fake-News-Checker--VissionMinds/backend/fakecheck-backend
# Stop current server (Ctrl+C)
npm run dev
```

#### C. Verify Backend is Running
Test the backend health endpoint:
```bash
curl http://localhost:5000/api/health
```

You should see:
```json
{
  "success": true,
  "message": "FakeCheck API is running",
  "timestamp": "..."
}
```

#### D. Check Network Tab
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try registering again
4. Check the request:
   - **URL**: Should be `http://localhost:5000/api/auth/register`
   - **Status**: Should be 200 or 400 (not 404)
   - **Headers**: Check if CORS headers are present

## Testing the Connection:

### Test 1: Health Check
Open in browser: `http://localhost:5000/api/health`

### Test 2: Registration Endpoint
Use Postman or curl:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"testuser","email":"test@test.com","password":"test123"}'
```

### Test 3: Check Frontend API URL
In browser console, run:
```javascript
console.log(import.meta.env.VITE_API_BASE_URL)
```
Should output: `http://localhost:5000/api`

## Common Issues:

### Issue: Still getting 404
**Solution**: 
1. Verify backend is running on port 5000
2. Check `.env` file exists in frontend directory
3. Restart frontend dev server after creating `.env`

### Issue: Still getting CORS error
**Solution**:
1. Make sure backend was restarted after CORS fix
2. Clear browser cache
3. Check browser console for exact error message

### Issue: "Registration failed" but no 404
**Solution**: 
This might be a validation error. Check:
1. Username must be at least 3 characters
2. Password must be at least 6 characters
3. Email must be valid format
4. Check backend console for error messages

## Verification Checklist:

- [ ] Backend server is running on port 5000
- [ ] Frontend `.env` file exists with `VITE_API_BASE_URL=http://localhost:5000/api`
- [ ] Backend was restarted after CORS fix
- [ ] Frontend was restarted after creating `.env`
- [ ] Health endpoint works: `http://localhost:5000/api/health`
- [ ] No CORS errors in browser console
- [ ] Registration endpoint returns proper error (not 404)

## If Still Not Working:

1. **Check Backend Logs**: Look at the terminal where backend is running for error messages
2. **Check Frontend Console**: Look for detailed error messages
3. **Verify MongoDB**: Make sure MongoDB is connected (backend should show connection message)
4. **Check Ports**: 
   - Backend: 5000
   - Frontend: 3001 (or whatever Vite assigned)

