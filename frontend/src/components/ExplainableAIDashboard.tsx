import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  FileText, 
  Link2,
  BarChart3,
  Brain
} from 'lucide-react';

interface ExplainableAIData {
  suspiciousWords?: Array<{ word: string; count: number; context: string }>;
  sentiment?: 'positive' | 'negative' | 'neutral';
  sentimentScore?: number;
  biasIndicators?: string[];
  sourceReliabilityBreakdown?: {
    domainScore: number;
    contentScore: number;
    crossReferenceScore: number;
    overallScore: number;
  };
  languageAnalysis?: {
    sensationalismScore: number;
    credibilityScore: number;
    objectivityScore: number;
  };
}

interface ExplainableAIDashboardProps {
  data: ExplainableAIData;
}

export const ExplainableAIDashboard: React.FC<ExplainableAIDashboardProps> = ({ data }) => {
  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-400';
      case 'negative': return 'text-rose-400';
      default: return 'text-cyan-400';
    }
  };

  const getSentimentBg = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-emerald-500/20 border-emerald-500/50';
      case 'negative': return 'bg-rose-500/20 border-rose-500/50';
      default: return 'bg-cyan-500/20 border-cyan-500/50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'text-emerald-400';
    if (score >= 0.4) return 'text-yellow-400';
    return 'text-rose-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 0.7) return 'bg-emerald-500/20';
    if (score >= 0.4) return 'bg-yellow-500/20';
    return 'bg-rose-500/20';
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-6 h-6 text-cyan-400 animate-pulse" />
        <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Explainable AI Analysis
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sentiment Analysis */}
        <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg border ${getSentimentBg(data.sentiment)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-lg font-semibold ${getSentimentColor(data.sentiment)}`}>
                  {data.sentiment?.toUpperCase() || 'NEUTRAL'}
                </span>
                {data.sentimentScore !== undefined && (
                  <span className={`text-sm ${getSentimentColor(data.sentiment)}`}>
                    {data.sentimentScore > 0 ? '+' : ''}{data.sentimentScore.toFixed(2)}
                  </span>
                )}
              </div>
              {data.sentimentScore !== undefined && (
                <div className="mt-2">
                  <Progress 
                    value={((data.sentimentScore + 1) / 2) * 100} 
                    className="h-2 bg-slate-700"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Source Reliability Breakdown */}
        {data.sourceReliabilityBreakdown && (
          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Source Reliability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Domain</span>
                  <span className={getScoreColor(data.sourceReliabilityBreakdown.domainScore)}>
                    {Math.round(data.sourceReliabilityBreakdown.domainScore * 100)}%
                  </span>
                </div>
                <Progress 
                  value={data.sourceReliabilityBreakdown.domainScore * 100} 
                  className="h-1.5 bg-slate-700"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Content</span>
                  <span className={getScoreColor(data.sourceReliabilityBreakdown.contentScore)}>
                    {Math.round(data.sourceReliabilityBreakdown.contentScore * 100)}%
                  </span>
                </div>
                <Progress 
                  value={data.sourceReliabilityBreakdown.contentScore * 100} 
                  className="h-1.5 bg-slate-700"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Cross-Reference</span>
                  <span className={getScoreColor(data.sourceReliabilityBreakdown.crossReferenceScore)}>
                    {Math.round(data.sourceReliabilityBreakdown.crossReferenceScore * 100)}%
                  </span>
                </div>
                <Progress 
                  value={data.sourceReliabilityBreakdown.crossReferenceScore * 100} 
                  className="h-1.5 bg-slate-700"
                />
              </div>
              <div className="pt-2 border-t border-slate-700">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-gray-300">Overall</span>
                  <span className={getScoreColor(data.sourceReliabilityBreakdown.overallScore)}>
                    {Math.round(data.sourceReliabilityBreakdown.overallScore * 100)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Language Analysis */}
        {data.languageAnalysis && (
          <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Language Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Credibility</span>
                  <span className={getScoreColor(data.languageAnalysis.credibilityScore)}>
                    {Math.round(data.languageAnalysis.credibilityScore * 100)}%
                  </span>
                </div>
                <Progress 
                  value={data.languageAnalysis.credibilityScore * 100} 
                  className="h-1.5 bg-slate-700"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Objectivity</span>
                  <span className={getScoreColor(data.languageAnalysis.objectivityScore)}>
                    {Math.round(data.languageAnalysis.objectivityScore * 100)}%
                  </span>
                </div>
                <Progress 
                  value={data.languageAnalysis.objectivityScore * 100} 
                  className="h-1.5 bg-slate-700"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Sensationalism</span>
                  <span className={getScoreColor(1 - data.languageAnalysis.sensationalismScore)}>
                    {Math.round((1 - data.languageAnalysis.sensationalismScore) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(1 - data.languageAnalysis.sensationalismScore) * 100} 
                  className="h-1.5 bg-slate-700"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Suspicious Words */}
        {data.suspiciousWords && data.suspiciousWords.length > 0 && (
          <Card className="bg-slate-800/50 border-rose-500/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Suspicious Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.suspiciousWords.map((item, index) => (
                  <Badge 
                    key={index}
                    className="bg-rose-500/20 text-rose-300 border-rose-500/50 hover:bg-rose-500/30 transition-colors"
                    title={item.context}
                  >
                    {item.word} ({item.count})
                  </Badge>
                ))}
              </div>
              {data.suspiciousWords.length > 0 && (
                <p className="text-xs text-gray-400 mt-3">
                  These words/phrases may indicate sensationalism or misinformation patterns.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Bias Indicators */}
        {data.biasIndicators && data.biasIndicators.length > 0 && (
          <Card className="bg-slate-800/50 border-yellow-500/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-yellow-400" />
                Bias Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.biasIndicators.map((indicator, index) => (
                  <Badge 
                    key={index}
                    className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50 hover:bg-yellow-500/30 transition-colors"
                  >
                    {indicator}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

