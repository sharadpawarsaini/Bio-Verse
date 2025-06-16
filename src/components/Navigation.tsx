import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Shield, QrCode, Scan, Settings, Mail, LogIn, UserPlus, LogOut } from 'lucide-react';
import { authService } from '../services/api';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  const navItems = [
    { path: '/', label: 'Home', icon: Heart },
    { path: '/admin', label: 'Admin', icon: Settings, protected: true },
    { path: '/scanner', label: 'Scanner', icon: Scan, protected: true },
    { path: '/offline-view', label: 'Offline', icon: Shield, protected: true },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="morphism border-b border-white/20 relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 floating">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">BioVerse</span>
          </Link>

          <div className="flex space-x-2">
            {navItems.map(({ path, label, icon: Icon, protected: isProtected }) => {
              if (isProtected && !isAuthenticated) return null;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 card-3d ${
                    location.pathname === path
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg neon-border'
                      : 'text-white/80 hover:text-white hover:bg-white/10 hover:shadow-lg'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 card-3d ${
                    location.pathname === '/login'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg neon-border'
                      : 'text-white/80 hover:text-white hover:bg-white/10 hover:shadow-lg'
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  to="/register"
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 card-3d ${
                    location.pathname === '/register'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg neon-border'
                      : 'text-white/80 hover:text-white hover:bg-white/10 hover:shadow-lg'
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Register</span>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 card-3d text-white/80 hover:text-white hover:bg-white/10 hover:shadow-lg"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};