import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getHistory, HistoryItem } from '../services/verifyService';
import { ResultCard } from '../components/ResultCard';
import { Loader } from '../components/Loader';
import { Card, CardContent } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { History as HistoryIcon, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export const History: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?._id) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getHistory(user._id);
        setHistory(data);
        setError('');
      } catch (err: any) {
        console.error('Failed to fetch history:', err);
        setError(err.message || 'Failed to load history. Please try again.');
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const handleClearHistory = () => {
    setHistory([]);
    toast.success('History cleared');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading your history..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <HistoryIcon className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-gray-900">Verification History</h1>
              <p className="text-gray-600">View your past news verifications</p>
            </div>
          </div>
          {history.length > 0 && (
            <Button onClick={handleClearHistory} variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear History
            </Button>
          )}
        </div>

        {/* Demo Alert */}
        {error && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* History List */}
        {history.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <HistoryIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">No History Yet</h3>
              <p className="text-gray-600">
                Start verifying news articles to see your history here
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {history.map((item) => (
              <ResultCard key={item._id} result={item} showDate />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
