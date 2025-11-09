import React from 'react';
import { VerifyResponse } from '../services/verifyService';
import { RESULT_COLORS, RESULT_TYPES } from '../utils/constants';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ExternalLink, Calendar } from 'lucide-react';
import { ExplainableAIDashboard } from './ExplainableAIDashboard';

interface ResultCardProps {
  result: VerifyResponse;
  showDate?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, showDate = false }) => {
  const resultType = result.result as keyof typeof RESULT_TYPES;
  const colors = RESULT_COLORS[resultType];

  return (
    <Card className={`${colors.border} border-l-4 holographic border-cyan-500/30`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 mb-2">
              <span>{colors.icon}</span>
              <span className={colors.text}>{colors.label}</span>
            </CardTitle>
            {showDate && result.createdAt && (
              <div className="flex items-center gap-2 text-gray-400 mt-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(result.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            )}
          </div>
          <Badge className={`${colors.badge} text-white`}>
            {Math.round(result.confidence * 100)}% Confidence
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Confidence Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-300">Confidence Score</span>
            <span className="text-cyan-400 font-semibold">
              {Math.round(result.confidence * 100)}%
            </span>
          </div>
          <Progress value={result.confidence * 100} className="h-2 bg-slate-700" />
        </div>

        {/* Text Content */}
        {result.text && (
          <div className={`${colors.bg} p-4 rounded-lg border ${colors.border} border-opacity-30`}>
            <p className="text-gray-300 italic">"{result.text}"</p>
          </div>
        )}

        {/* URL */}
        {result.url && (
          <div className="flex items-center gap-2 text-cyan-400">
            <ExternalLink className="w-4 h-4" />
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline break-all"
            >
              {result.url}
            </a>
          </div>
        )}

        {/* Explanation */}
        <div>
          <h4 className="text-cyan-400 mb-2 font-semibold">Analysis</h4>
          <p className="text-gray-300 leading-relaxed">{result.explanation}</p>
        </div>

        {/* Sources */}
        {result.sources && result.sources.length > 0 && (
          <div>
            <h4 className="text-cyan-400 mb-2 font-semibold">Sources</h4>
            <ul className="space-y-1">
              {result.sources.map((source, index) => (
                <li key={index}>
                  <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span className="break-all">{source}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Explainable AI Dashboard */}
        {result.explainableAI && (
          <ExplainableAIDashboard data={result.explainableAI} />
        )}
      </CardContent>
    </Card>
  );
};
