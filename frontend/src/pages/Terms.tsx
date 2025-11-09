import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FileText } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen gradient-animated">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-300">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card className="holographic mb-6 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Agreement to Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              By accessing and using VeriScan AI, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access our service.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Use of Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-3">You agree to use VeriScan AI only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>Use the service to verify content that is illegal, harmful, or violates any laws</li>
                <li>Attempt to reverse engineer or compromise the AI system</li>
                <li>Submit excessive automated requests that may overload our servers</li>
                <li>Use the service to spread misinformation or manipulate verification results</li>
                <li>Impersonate others or provide false account information</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">AI Analysis Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                VeriScan AI provides fact-checking analysis using artificial intelligence. While we 
                strive for accuracy, AI-generated assessments are not infallible and should be used 
                as a tool to aid in verification, not as the sole determinant of truth. Users should 
                exercise their own judgment and consult multiple sources when making important decisions 
                based on verification results.
              </p>
            </CardContent>
          </Card>

          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                All content, features, and functionality of VeriScan AI, including but not limited to 
                text, graphics, logos, and software, are owned by VeriScan AI and are protected by 
                international copyright, trademark, and other intellectual property laws.
              </p>
            </CardContent>
          </Card>

          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                VeriScan AI is provided "as is" without warranties of any kind. We are not liable 
                for any damages arising from the use or inability to use our service, including but 
                not limited to direct, indirect, incidental, or consequential damages.
              </p>
            </CardContent>
          </Card>

          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Account Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                We reserve the right to suspend or terminate your account at any time for violation 
                of these Terms, fraudulent activity, or any other reason we deem necessary to protect 
                our service and users.
              </p>
            </CardContent>
          </Card>

          <Card className="holographic border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                We reserve the right to modify these Terms at any time. Continued use of the service 
                after changes constitutes acceptance of the new Terms. We will notify users of significant 
                changes via email or platform notification.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

