import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Brain, Shield, Zap, Eye } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen gradient-animated">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            About VeriScan AI
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Empowering truth through advanced AI-powered fact-checking technology
          </p>
        </div>

        <Card className="holographic mb-8 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed">
              VeriScan AI is dedicated to combating misinformation and fake news by providing 
              transparent, explainable AI-powered fact-checking services. We believe that everyone 
              deserves access to accurate information and the tools to verify it.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Advanced AI Technology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Powered by state-of-the-art machine learning models and OpenAI's GPT technology, 
                VeriScan AI analyzes articles with unprecedented accuracy and provides detailed 
                explanations for every assessment.
              </p>
            </CardContent>
          </Card>

          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Explainable AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Unlike black-box AI systems, VeriScan AI provides transparent analysis including 
                sentiment breakdown, suspicious word detection, bias indicators, and source reliability 
                scores so you understand how decisions are made.
              </p>
            </CardContent>
          </Card>

          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Trust & Reliability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Our system evaluates multiple factors including source credibility, content analysis, 
                cross-referencing, and language patterns to provide comprehensive fact-checking results.
              </p>
            </CardContent>
          </Card>

          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Fast & Accurate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Get instant fact-checking results with high confidence scores. Our AI processes 
                articles in seconds while maintaining accuracy through continuous model improvements.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="holographic border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                1
              </div>
              <div>
                <h3 className="text-cyan-400 font-semibold mb-1">Submit Content</h3>
                <p className="text-gray-300">Enter text or paste a URL of the article you want to verify.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                2
              </div>
              <div>
                <h3 className="text-cyan-400 font-semibold mb-1">AI Analysis</h3>
                <p className="text-gray-300">Our AI analyzes the content, source, and language patterns using advanced algorithms.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                3
              </div>
              <div>
                <h3 className="text-cyan-400 font-semibold mb-1">Get Results</h3>
                <p className="text-gray-300">Receive a detailed assessment with confidence scores, explanations, and explainable AI breakdown.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

