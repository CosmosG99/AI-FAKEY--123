import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { Loader } from '../components/Loader';
import { toast } from 'sonner';

export const Register: React.FC = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (username.length < 2 || username.length > 50) {
      setError('Username must be between 2 and 50 characters');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Check password requirements: at least one uppercase, one lowercase, and one number
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register(username, email, password);
      toast.success('Registration successful!');
      navigate(ROUTES.HOME);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      toast.error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-animated flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="w-12 h-12 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Create Account</h1>
          <p className="text-gray-300">Join VeriScan AI to start verifying news</p>
        </div>

        {/* Register Card */}
        <Card className="holographic shadow-2xl border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">Register</CardTitle>
            <CardDescription className="text-gray-400">Create your account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-rose-500/20 border-rose-500/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-rose-300">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-white text-black placeholder:text-gray-500 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-white text-black placeholder:text-gray-500 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-white text-black placeholder:text-gray-500 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-white text-black placeholder:text-gray-500 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white glow-hover" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader size="sm" />
                    <span className="ml-2">Creating account...</span>
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN} className="text-cyan-400 hover:text-cyan-300 hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Password Requirements Info */}
        <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
          <p className="text-cyan-400 text-sm font-medium mb-2">Password Requirements:</p>
          <ul className="text-gray-300 text-sm list-disc list-inside space-y-1">
            <li>At least 6 characters long</li>
            <li>At least one uppercase letter (A-Z)</li>
            <li>At least one lowercase letter (a-z)</li>
            <li>At least one number (0-9)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
