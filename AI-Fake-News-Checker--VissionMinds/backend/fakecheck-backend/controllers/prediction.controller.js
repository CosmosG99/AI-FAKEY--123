const Prediction = require('../models/Prediction');
const Article = require('../models/Article');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const aiService = require('../services/aiService');
const mongoose = require('mongoose');

// @desc    Generate prediction for an article
// @route   POST /api/predictions
// @access  Private
const generatePrediction = asyncHandler(async (req, res) => {
    const { articleId } = req.body;

    // Validate articleId
    if (!articleId) {
        return res.status(400).json({
            success: false,
            message: 'Article ID is required'
        });
    }

    const id = articleId.trim();
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid article ID'
        });
    }

    // Check if article exists
    const article = await Article.findById(id);
    if (!article) {
        return res.status(404).json({
            success: false,
            message: 'Article not found'
        });
    }

    // Check if prediction already exists
    let prediction = await Prediction.findOne({ articleId: id });
    if (prediction) {
        return res.status(200).json({
            success: true,
            message: 'Prediction already exists',
            data: prediction
        });
    }

    // Prepare article data for AI service
    const articleData = {
        title: article.title || '',
        content: article.content,
        url: article.url || '',
        domain: article.domain || '',
        sourceReliabilityScore: article.sourceReliabilityScore || 0.5
    };

    // Call AI service to analyze article
    let aiResponse;
    try {
        aiResponse = await aiService.analyzeArticle(articleData);
    } catch (error) {
        console.error('Error calling AI service:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to generate prediction. AI service unavailable.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }

    // Create prediction in database with explainable AI data
    try {
        prediction = await Prediction.create({
            articleId: article._id,
            predictedLabel: aiResponse.label,
            confidenceScore: aiResponse.confidence,
            explanation: aiResponse.explanation,
            evidenceLinks: aiResponse.evidenceLinks || [],
            sentiment: aiResponse.sentiment || 'neutral',
            sentimentScore: aiResponse.sentimentScore || 0,
            suspiciousWords: aiResponse.suspiciousWords || [],
            biasIndicators: aiResponse.biasIndicators || [],
            sourceReliabilityBreakdown: aiResponse.sourceReliabilityBreakdown || {
                domainScore: article.sourceReliabilityScore || 0.5,
                contentScore: 0.5,
                crossReferenceScore: 0.5,
                overallScore: article.sourceReliabilityScore || 0.5
            },
            languageAnalysis: aiResponse.languageAnalysis || {
                sensationalismScore: 0.5,
                credibilityScore: 0.5,
                objectivityScore: 0.5
            }
        });

        // Add prediction to user's history (optional)
        try {
            await User.findByIdAndUpdate(
                article.submittedBy,
                { $push: { history: prediction._id } },
                { new: true }
            );
        } catch (historyError) {
            // Log but don't fail if history update fails
            console.warn('Failed to update user history:', historyError.message);
        }

        res.status(201).json({
            success: true,
            message: 'Prediction generated successfully',
            data: prediction
        });
    } catch (dbError) {
        console.error('Error saving prediction to database:', dbError);
        return res.status(500).json({
            success: false,
            message: 'Failed to save prediction to database',
            error: process.env.NODE_ENV === 'development' ? dbError.message : undefined
        });
    }
});

// @desc    Get all predictions
// @route   GET /api/predictions
// @access  Private
const getPredictions = asyncHandler(async (req, res) => {
    const predictions = await Prediction.find()
        .populate('articleId')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: predictions.length,
        data: predictions
    });
});

// @desc    Get single prediction
// @route   GET /api/predictions/:id
// @access  Private
const getPrediction = asyncHandler(async (req, res) => {
    const prediction = await Prediction.findById(req.params.id.trim())
        .populate({
            path: 'articleId',
            populate: {
                path: 'submittedBy',
                select: 'name email'
            }
        });

    if (!prediction) {
        return res.status(404).json({
            success: false,
            message: 'Prediction not found'
        });
    }

    res.status(200).json({
        success: true,
        data: prediction
    });
});

// @desc    Get prediction by article ID
// @route   GET /api/predictions/article/:articleId
// @access  Private
const getPredictionByArticle = asyncHandler(async (req, res) => {
    const articleId = req.params.articleId.trim();
    
    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid article ID'
        });
    }

    const prediction = await Prediction.findOne({ articleId })
        .populate({
            path: 'articleId',
            populate: {
                path: 'submittedBy',
                select: 'name email'
            }
        });

    if (!prediction) {
        return res.status(404).json({
            success: false,
            message: 'Prediction not found for this article'
        });
    }

    res.status(200).json({
        success: true,
        data: prediction
    });
});

module.exports = {
    generatePrediction,
    getPredictions,
    getPrediction,
    getPredictionByArticle
};
