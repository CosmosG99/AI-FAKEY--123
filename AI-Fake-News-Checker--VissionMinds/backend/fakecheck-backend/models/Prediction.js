const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
        unique: true // One prediction per article
    },
    predictedLabel: {
        type: String,
        enum: ['Likely True', 'Uncertain', 'Likely False'],
        required: true
    },
    confidenceScore: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },
    explanation: {
        type: String,
        required: true,
        trim: true
    },
    evidenceLinks: [{
        type: String,
        trim: true
    }],
    // Explainable AI data
    suspiciousWords: [{
        word: String,
        count: Number,
        context: String
    }],
    sentiment: {
        type: String,
        enum: ['positive', 'negative', 'neutral'],
        default: 'neutral'
    },
    sentimentScore: {
        type: Number,
        min: -1,
        max: 1,
        default: 0
    },
    biasIndicators: [{
        type: String
    }],
    sourceReliabilityBreakdown: {
        domainScore: Number,
        contentScore: Number,
        crossReferenceScore: Number,
        overallScore: Number
    },
    languageAnalysis: {
        sensationalismScore: Number,
        credibilityScore: Number,
        objectivityScore: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Prediction', predictionSchema);

