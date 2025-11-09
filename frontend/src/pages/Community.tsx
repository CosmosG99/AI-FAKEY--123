import React, { useEffect, useState } from 'react';
import {
  getCommunityPosts,
  upvoteVerification,
  downvoteVerification,
  addComment,
  CommunityPost,
} from '../services/verifyService';
import { ResultCard } from '../components/ResultCard';
import { FeedbackSection } from '../components/FeedbackSection';
import { Loader } from '../components/Loader';
import { Card, CardContent } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Users, AlertCircle, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

export const Community: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getCommunityPosts();
        setPosts(data);
        setError('');
      } catch (err: any) {
        console.error('Failed to fetch community posts:', err);
        setError(err.message || 'Failed to load community posts. Please try again.');
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleUpvote = async (postId: string) => {
    const post = posts.find((p) => p._id === postId);
    if (!post?.predictionId) return;

    try {
      await upvoteVerification(post.predictionId);
      // Refresh posts to get updated counts
      const data = await getCommunityPosts();
      setPosts(data);
    } catch (err: any) {
      console.error('Upvote failed:', err);
      toast.error(err.message || 'Failed to upvote');
    }
  };

  const handleDownvote = async (postId: string) => {
    const post = posts.find((p) => p._id === postId);
    if (!post?.predictionId) return;

    try {
      await downvoteVerification(post.predictionId);
      // Refresh posts to get updated counts
      const data = await getCommunityPosts();
      setPosts(data);
    } catch (err: any) {
      console.error('Downvote failed:', err);
      toast.error(err.message || 'Failed to downvote');
    }
  };

  const handleAddComment = async (postId: string, text: string) => {
    const post = posts.find((p) => p._id === postId);
    if (!post?.predictionId) return;

    try {
      await addComment(post.predictionId, text);
      // Refresh posts to get updated comments
      const data = await getCommunityPosts();
      setPosts(data);
    } catch (err: any) {
      console.error('Add comment failed:', err);
      throw err;
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    const scoreA = a.upvotes - a.downvotes;
    const scoreB = b.upvotes - b.downvotes;
    return scoreB - scoreA;
  });

  const recentPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading community posts..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-gray-900">Community</h1>
            <p className="text-gray-600">
              See what others are verifying and share your insights
            </p>
          </div>
        </div>

        {/* Demo Alert */}
        {error && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Posts */}
        <Tabs defaultValue="trending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="trending">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            {sortedPosts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">No Posts Yet</h3>
                  <p className="text-gray-600">
                    Be the first to share a verification with the community
                  </p>
                </CardContent>
              </Card>
            ) : (
              sortedPosts.map((post) => (
                <div key={post._id} className="space-y-4">
                  <ResultCard result={post} showDate />
                  <FeedbackSection
                    verificationId={post._id}
                    upvotes={post.upvotes}
                    downvotes={post.downvotes}
                    comments={post.comments}
                    onUpvote={() => handleUpvote(post._id)}
                    onDownvote={() => handleDownvote(post._id)}
                    onAddComment={(text) => handleAddComment(post._id, text)}
                  />
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            {recentPosts.map((post) => (
              <div key={post._id} className="space-y-4">
                <ResultCard result={post} showDate />
                <FeedbackSection
                  verificationId={post._id}
                  upvotes={post.upvotes}
                  downvotes={post.downvotes}
                  comments={post.comments}
                  onUpvote={() => handleUpvote(post._id)}
                  onDownvote={() => handleDownvote(post._id)}
                  onAddComment={(text) => handleAddComment(post._id, text)}
                />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
