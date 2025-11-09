import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Shield } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen gradient-animated">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card className="holographic mb-6 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Your Privacy Matters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              At VeriScan AI, we are committed to protecting your privacy and ensuring the security 
              of your personal information. This Privacy Policy explains how we collect, use, and 
              safeguard your data.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="text-cyan-400 font-semibold mb-2">Account Information</h3>
                <p className="text-gray-300">
                  When you register, we collect your username, email address, and password (encrypted). 
                  This information is used to create and manage your account.
                </p>
              </div>
              <div>
                <h3 className="text-cyan-400 font-semibold mb-2">Verification Data</h3>
                <p className="text-gray-300">
                  Articles and content you submit for verification are stored to provide you with 
                  verification history and improve our services. This data is associated with your account.
                </p>
              </div>
              <div>
                <h3 className="text-cyan-400 font-semibold mb-2">Usage Data</h3>
                <p className="text-gray-300">
                  We collect information about how you use our service, including verification requests, 
                  feature usage, and interaction patterns to improve our platform.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>To provide and maintain our fact-checking services</li>
                <li>To process your verification requests and generate AI-powered analysis</li>
                <li>To improve our AI models and service quality</li>
                <li>To communicate with you about your account and our services</li>
                <li>To ensure security and prevent fraud</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                We implement industry-standard security measures to protect your data, including 
                encryption, secure authentication, and regular security audits. Your passwords are 
                hashed and never stored in plain text.
              </p>
            </CardContent>
          </Card>

          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-3">You have the right to:</p>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and associated data</li>
                <li>Opt-out of certain data collection practices</li>
                <li>Export your data in a portable format</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                If you have questions about this Privacy Policy or wish to exercise your rights, 
                please contact us through our <a href="/contact" className="text-cyan-400 hover:underline">Contact page</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

