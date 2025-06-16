import React from 'react';
import { Heart, Mail, Phone, MapPin, Shield, Lock, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="morphism border-t border-white/20 mt-20 relative z-10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg floating">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">BioVerse</span>
            </div>
            <p className="text-white/70 leading-relaxed">
              Smart Medical Wearable System providing secure, instant access to critical patient 
              medical data for emergency responders worldwide.
            </p>
            <div className="flex space-x-4">
              <div className="morphism p-3 rounded-xl border border-green-400/30 card-3d">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <div className="morphism p-3 rounded-xl border border-blue-400/30 card-3d">
                <Lock className="h-6 w-6 text-blue-400" />
              </div>
              <div className="morphism p-3 rounded-xl border border-purple-400/30 card-3d">
                <FileText className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-blue-400" />
                <div>
                  <p className="text-white">support@bioverse.health</p>
                  <p className="text-sm text-white/60">General Support</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-white">+1 (555) 123-4567</p>
                  <p className="text-sm text-white/60">24/7 Emergency Line</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-red-400" />
                <div>
                  <p className="text-white">123 Medical Plaza</p>
                  <p className="text-white">San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Quick Links</h3>
            <div className="space-y-3">
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                Emergency Access Guide
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                Healthcare Provider Portal
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                Patient Registration
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                API Documentation
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                System Status
              </a>
            </div>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Legal & Compliance</h3>
            <div className="space-y-3">
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                Privacy Policy
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                Terms of Service
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                HIPAA Compliance
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                Security Standards
              </a>
              <a href="#" className="block text-white/70 hover:text-blue-400 transition-colors duration-300 hover:translate-x-2 transform">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Banner */}
      <div className="morphism border-t border-blue-400/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5"></div>
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-white/90">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-blue-400" />
                <span className="text-white/90">AES-256 Encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-purple-400" />
                <span className="text-white/90">FDA Registered</span>
              </div>
            </div>
            <div className="text-sm text-white/70">
              Emergency Medical Data System • Licensed Healthcare Technology
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="morphism border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white/70">
                © {currentYear} BioVerse Technologies, Inc. All rights reserved.
              </p>
              <p className="text-sm text-white/50 mt-1">
                Patent Pending • Medical Device Registration: MD-2024-BV-001
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-white/60">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Last Updated: {new Date().toLocaleDateString()}</span>
              <span>•</span>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                Report Issue
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 border-t border-red-400/30">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-red-200 text-sm">
            <strong>EMERGENCY NOTICE:</strong> This system is designed for emergency medical access only. 
            For immediate medical emergencies, call 911 or your local emergency services.
          </p>
        </div>
      </div>
    </footer>
  );
};