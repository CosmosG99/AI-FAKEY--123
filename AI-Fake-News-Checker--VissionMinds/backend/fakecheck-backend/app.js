const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');
const connectDB = require('./config/db');
//Route files
const authRoutes = require('./routes/auth.routes');
const articleRoutes = require('./routes/article.routes');
const predictionRoutes = require('./routes/prediction.routes');
const feedbackRoutes = require('./routes/feedback.routes');
// Load env vars
dotenv.config();

// Connect to database
connectDB();
//6CHiCaPsreRerjFf
//cleavendcosta_db_user


const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // List of allowed origins
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:5173',
            'http://localhost:5174'
        ].filter(Boolean); // Remove undefined values
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(logger);
}

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'FakeCheck API is running',
        timestamp: new Date().toISOString()
    });
});

// Error handler (must be last middleware)
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

module.exports = app;

