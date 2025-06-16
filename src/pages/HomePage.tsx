import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Scan, Shield, Heart, AlertTriangle, Lock, Zap, Globe, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 relative">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-full w-28 h-28 mx-auto mb-8 flex items-center justify-center shadow-2xl floating pulse-glow">
          <Heart className="h-14 w-14 text-white" />
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          Welcome to <span className="gradient-text">BioVerse</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
          Smart Medical Wearable System that enables emergency responders to access critical patient 
          medical data instantly through QR codes — even without internet access.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="morphism px-6 py-3 rounded-full text-white/90 flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span>Instant Access</span>
          </div>
          <div className="morphism px-6 py-3 rounded-full text-white/90 flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-400" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="morphism px-6 py-3 rounded-full text-white/90 flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-400" />
            <span>Works Offline</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Link
          to="/admin"
          className="morphism p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-blue-400/50 group card-3d relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl w-fit mb-6 group-hover:shadow-lg transition-all duration-300">
              <QrCode className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Generate QR Code</h3>
            <p className="text-white/70 leading-relaxed">
              Create encrypted QR codes containing essential medical information for emergency access.
            </p>
          </div>
        </Link>

        <Link
          to="/scanner"
          className="morphism p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-green-400/50 group card-3d relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl w-fit mb-6 group-hover:shadow-lg transition-all duration-300">
              <Scan className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Scan QR Code</h3>
            <p className="text-white/70 leading-relaxed">
              Emergency responders can instantly scan QR codes to access critical medical data.
            </p>
          </div>
        </Link>

        <Link
          to="/offline-view"
          className="morphism p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-purple-400/50 group card-3d relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl w-fit mb-6 group-hover:shadow-lg transition-all duration-300">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Offline Access</h3>
            <p className="text-white/70 leading-relaxed">
              Access cached medical data even when internet connection is unavailable.
            </p>
          </div>
        </Link>
      </div>

      {/* Security Notice */}
      <div className="morphism border border-red-400/30 rounded-2xl p-8 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5"></div>
        <div className="relative z-10 flex items-start space-x-6">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-xl shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">HIPAA Compliance & Data Security</h3>
            <p className="text-white/80 leading-relaxed text-lg">
              This system uses AES encryption to protect sensitive medical data. Access is restricted to 
              authorized emergency personnel only. All medical information is encrypted at rest and in transit.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="morphism rounded-2xl p-10 border border-white/20">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">How BioVerse Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center group">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 card-3d">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Setup Profile</h3>
            <p className="text-white/70 leading-relaxed">
              Patients or healthcare providers enter medical information through the secure admin panel.
            </p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 card-3d">
              <span className="text-3xl font-bold text-white">2</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Generate QR</h3>
            <p className="text-white/70 leading-relaxed">
              System generates encrypted QR codes that can be printed on medical bracelets or cards.
            </p>
          </div>
          <div className="text-center group">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 card-3d">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Emergency Access</h3>
            <p className="text-white/70 leading-relaxed">
              Emergency responders scan QR codes to instantly access critical medical information.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        <div className="morphism p-6 rounded-xl text-center border border-white/20">
          <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
          <div className="text-white/70">Uptime</div>
        </div>
        <div className="morphism p-6 rounded-xl text-center border border-white/20">
          <div className="text-3xl font-bold gradient-text mb-2">2.5s</div>
          <div className="text-white/70">Avg Response</div>
        </div>
        <div className="morphism p-6 rounded-xl text-center border border-white/20">
          <div className="text-3xl font-bold gradient-text mb-2">500+</div>
          <div className="text-white/70">Hospitals</div>
        </div>
        <div className="morphism p-6 rounded-xl text-center border border-white/20">
          <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
          <div className="text-white/70">Support</div>
        </div>
      </div>
    </div>
  );
};