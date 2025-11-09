import React, { useState } from 'react';
import { verifyNews, VerifyResponse } from '../services/verifyService';
import { ResultCard } from '../components/ResultCard';
import { Loader } from '../components/Loader';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Search, Link as LinkIcon, AlertCircle, Brain, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const Home: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('text');

  const handleVerify = async () => {
    setError('');
    setResult(null);

    const data = activeTab === 'text' ? { text: inputText } : { url: inputUrl };

    if (!data.text && !data.url) {
      setError('Please enter some text or a URL to verify');
      return;
    }

    // Validate text length if text input is used
    if (activeTab === 'text' && data.text && data.text.trim().length < 50) {
      setError('Article content must be at least 50 characters long. Please provide more text for accurate analysis.');
      toast.error('Content too short. Minimum 50 characters required.');
      return;
    }

    setIsLoading(true);

    try {
      // Call the API
      const response = await verifyNews(data);
      setResult(response);
      toast.success('Verification complete!');
    } catch (err: any) {
      console.error('Verification failed:', err);
      setError(err.message || 'Failed to verify news. Please try again.');
      toast.error(err.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-animated">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Brain className="w-20 h-20 text-cyan-400 pulse-glow" />
              <Sparkles className="w-8 h-8 text-blue-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            VeriScan AI
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Advanced AI-Powered Fact-Checking System. Verify the authenticity of news articles
            and claims using explainable machine learning algorithms.
          </p>
        </div>

        {/* Input Card */}
        <Card className="mb-8 holographic glow-hover shadow-2xl border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Verify News Content
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter text or paste a URL to check if the content is likely true, false, or uncertain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">
                  <Search className="w-4 h-4 mr-2" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="url">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  URL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Enter the news text or claim you want to verify... (minimum 50 characters)"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={6}
                    className="resize-none bg-white text-black placeholder:text-gray-500 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                  />
                  <p className="text-xs text-gray-400">
                    {inputText.length < 50 
                      ? `${50 - inputText.length} more characters needed (minimum 50)` 
                      : `${inputText.length} characters - ready to verify`}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <Input
                  type="url"
                  placeholder="https://example.com/news-article"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="bg-white text-black placeholder:text-gray-500 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </TabsContent>
            </Tabs>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleVerify}
              disabled={isLoading || (activeTab === 'text' && inputText.trim().length < 50) || (activeTab === 'url' && !inputUrl.trim())}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white glow-hover"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader size="sm" />
                  <span className="ml-2">Verifying...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Verify Now
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <Loader size="lg" text="Analyzing content with AI..." />
          </div>
        )}

        {/* Result */}
        {result && !isLoading && (
          <div className="space-y-6">
            <ResultCard result={result} showDate />
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This analysis is generated by AI and should be used as a guidance tool.
                Always verify important information from multiple reliable sources.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Info Cards */}
        {!result && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🤖</span>
                  AI-Powered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced machine learning models analyze content patterns and credibility
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>⚡</span>
                  Fast Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get instant verification results in seconds with detailed explanations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🔍</span>
                  Source Checking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Cross-references with fact-checking databases and credible sources
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
