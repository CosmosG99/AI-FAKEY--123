import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Github, Twitter, Linkedin, ScanLine } from 'lucide-react';
import { ROUTES } from '../utils/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/90 backdrop-blur-md border-t border-cyan-500/20 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Brain className="w-8 h-8 text-cyan-400" />
                <ScanLine className="w-6 h-6 text-cyan-500 absolute -top-1 -right-1 opacity-70" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                VeriScan AI
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Advanced AI-Powered Fact-Checking System. Helping users verify news authenticity
              using explainable machine learning algorithms and transparent AI analysis.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors glow-hover p-2 rounded-lg"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors glow-hover p-2 rounded-lg"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors glow-hover p-2 rounded-lg"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cyan-400 mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.HOME} className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to={ROUTES.COMMUNITY} className="hover:text-cyan-400 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT} className="hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-cyan-400 mb-4 font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.PRIVACY} className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={ROUTES.TERMS} className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:text-cyan-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cyan-500/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} VeriScan AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
