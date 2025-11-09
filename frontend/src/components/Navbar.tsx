import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import { Brain, Menu, X, LogOut, User, ScanLine } from 'lucide-react';
import { Button } from './ui/button';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'History', path: ROUTES.HISTORY, protected: true },
    { name: 'Community', path: ROUTES.COMMUNITY, protected: true },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-50 glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
            <div className="relative">
              <Brain className="w-8 h-8 text-cyan-400 pulse-glow" />
              <ScanLine className="w-6 h-6 text-cyan-500 absolute -top-1 -right-1 opacity-70" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-400 transition-all">
              VeriScan AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              if (link.protected && !isAuthenticated) return null;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-all px-3 py-1 rounded-lg ${
                    isActivePath(link.path)
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 glow-hover'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-cyan-500/20">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300">{user?.username}</span>
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 glow-hover">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to={ROUTES.LOGIN}>
                  <Button variant="outline" size="sm" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 glow-hover">
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white glow-hover">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 text-cyan-400"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyan-500/20">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                if (link.protected && !isAuthenticated) return null;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      isActivePath(link.path)
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-300 hover:bg-slate-800/50 hover:text-cyan-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-cyan-500/20">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-300">{user?.username}</span>
                  </div>
                  <Button onClick={handleLogout} variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to={ROUTES.LOGIN} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                      Login
                    </Button>
                  </Link>
                  <Link to={ROUTES.REGISTER} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
