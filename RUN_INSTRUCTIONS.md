# Step-by-Step Instructions to Run the Project

## Prerequisites

Before starting, make sure you have:
- ✅ Node.js installed (version 14 or higher)
- ✅ MongoDB database (local or cloud like MongoDB Atlas)
- ✅ Two terminal windows/command prompts open

---

## Step 1: Backend Setup

### 1.1 Navigate to Backend Directory

Open your first terminal and navigate to the backend folder:

```bash
cd AI-Fake-News-Checker--VissionMinds/backend/fakecheck-backend
```

### 1.2 Install Backend Dependencies

```bash
npm install
```

This will install all required packages (Express, Mongoose, CORS, etc.)

### 1.3 Create Backend Environment File

Create a `.env` file in the `AI-Fake-News-Checker--VissionMinds/backend/fakecheck-backend` directory:

**On Windows (PowerShell):**
```powershell
New-Item -Path .env -ItemType File
```

**On Windows (Command Prompt):**
```cmd
type nul > .env
```

**On Mac/Linux:**
```bash
touch .env
```

Then open the `.env` file and add the following content:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/fakecheck
JWT_SECRET=your_super_secret_jwt_key_here_change_this
```

**Important:** 
- Replace `mongodb://localhost:27017/fakecheck` with your actual MongoDB connection string
- If using MongoDB Atlas, use: `mongodb+srv://username:password@cluster.mongodb.net/fakecheck`
- Replace `your_super_secret_jwt_key_here_change_this` with a strong random string

### 1.4 Start the Backend Server

```bash
npm run dev
```

You should see output like:
```
Server running in development mode on port 5000
MongoDB Connected: ...
```

**Keep this terminal open!** The backend server must stay running.

---

## Step 2: Frontend Setup

### 2.1 Navigate to Frontend Directory

Open your **second terminal** and navigate to the frontend folder:

```bash
cd frontend
```

### 2.2 Install Frontend Dependencies

```bash
npm install
```

This will install all required packages (React, Axios, Vite, etc.)

### 2.3 Create Frontend Environment File

Create a `.env` file in the `frontend` directory:

**On Windows (PowerShell):**
```powershell
New-Item -Path .env -ItemType File
```

**On Windows (Command Prompt):**
```cmd
type nul > .env
```

**On Mac/Linux:**
```bash
touch .env
```

Then open the `.env` file and add the following content:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Note:** If your backend runs on a different port (not 5000), update this URL accordingly.

### 2.4 Start the Frontend Development Server

```bash
npm run dev
```

You should see output like:
```
VITE v6.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Keep this terminal open too!** The frontend server must stay running.

---

## Step 3: Access the Application

1. Open your web browser
2. Navigate to: **http://localhost:5173**

You should see the FakeCheck application homepage!

---

## Step 4: Test the Application

### 4.1 Register a New User

1. Click on **"Register"** or navigate to `/register`
2. Fill in:
   - Username (at least 3 characters)
   - Email
   - Password (at least 6 characters)
   - Confirm Password
3. Click **"Create Account"**
4. You should be redirected to the home page

### 4.2 Login (if you already have an account)

1. Click on **"Login"** or navigate to `/login`
2. Enter your email and password
3. Click **"Login"**

### 4.3 Verify a News Article

1. On the Home page, you'll see two tabs: **Text** and **URL**
2. **Option A - Text Input:**
   - Select the "Text" tab
   - Paste or type some news text
   - Click **"Verify Now"**
   
3. **Option B - URL Input:**
   - Select the "URL" tab
   - Paste a news article URL
   - Click **"Verify Now"**

4. Wait for the AI analysis (this may take a few seconds)
5. View the verification result with confidence score and explanation

### 4.4 View Your History

1. Click on **"History"** in the navigation
2. You'll see all your past verifications

### 4.5 View Community Posts

1. Click on **"Community"** in the navigation
2. See all community verifications
3. You can:
   - Upvote/Downvote verifications
   - Add comments
   - View trending or recent posts

---

## Troubleshooting

### Backend Issues

**Problem:** `MongoDB connection error`
- **Solution:** Make sure MongoDB is running locally, or check your MongoDB Atlas connection string

**Problem:** `Port 5000 already in use`
- **Solution:** Change `PORT=5000` to a different port (e.g., `PORT=5001`) in backend `.env`, and update frontend `.env` accordingly

**Problem:** `Cannot find module 'nodemon'`
- **Solution:** Run `npm install -g nodemon` or use `npm start` instead of `npm run dev`

### Frontend Issues

**Problem:** `Cannot connect to API`
- **Solution:** 
  - Make sure backend is running
  - Check that `VITE_API_BASE_URL` in frontend `.env` matches your backend URL
  - Verify CORS is configured correctly

**Problem:** `Port 5173 already in use`
- **Solution:** Vite will automatically use the next available port, or specify: `npm run dev -- --port 3000`

**Problem:** `Module not found errors`
- **Solution:** Run `npm install` again in the frontend directory

### CORS Errors

If you see CORS errors in the browser console:
1. Check that `FRONTEND_URL` in backend `.env` matches your frontend URL
2. Make sure both servers are running
3. Clear browser cache and reload

---

## Quick Command Reference

### Backend (Terminal 1)
```bash
cd AI-Fake-News-Checker--VissionMinds/backend/fakecheck-backend
npm install
# Create .env file with MongoDB URI and JWT_SECRET
npm run dev
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install
# Create .env file with VITE_API_BASE_URL=http://localhost:5000/api
npm run dev
```

---

## Stopping the Servers

To stop the servers:
- Press `Ctrl + C` in each terminal window
- Or close the terminal windows

---

## Next Steps

Once everything is running:
- ✅ Test user registration and login
- ✅ Verify news articles
- ✅ Check your verification history
- ✅ Explore community features
- ✅ Test feedback and comments

**Happy coding! 🚀**

