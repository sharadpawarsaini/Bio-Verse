import React, { useState, useCallback } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { Scan, AlertCircle, CheckCircle, Camera, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ScannerPage: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleScan = useCallback((result: string) => {
    try {
      // Check if the scanned result is a BioVerse URL
      const url = new URL(result);
      if (url.hostname === window.location.hostname && url.pathname.startsWith('/view/')) {
        const patientId = url.pathname.split('/view/')[1];
        setSuccess(`Patient ID detected: ${patientId}`);
        setScanning(false);
        
        // Redirect to patient view after a short delay
        setTimeout(() => {
          navigate(`/view/${patientId}`);
        }, 1500);
      } else {
        setError('Invalid QR code. This does not appear to be a BioVerse medical QR code.');
      }
    } catch (err) {
      // If not a URL, try to extract patient ID directly
      if (result.length > 0) {
        setError('Invalid QR code format. Please scan a valid BioVerse medical QR code.');
      }
    }
  }, [navigate]);

  const handleError = useCallback((error: Error) => {
    console.error('QR Scanner Error:', error);
    setError('Camera access error. Please ensure camera permissions are granted.');
  }, []);

  const startScanning = () => {
    setScanning(true);
    setError(null);
    setSuccess(null);
  };

  const stopScanning = () => {
    setScanning(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="morphism rounded-2xl p-10 border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-600/5"></div>
        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 rounded-full w-28 h-28 mx-auto mb-8 flex items-center justify-center shadow-2xl floating pulse-glow">
              <Scan className="h-14 w-14 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">QR Code Scanner</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Scan medical QR codes to access emergency patient information
            </p>
          </div>

          {/* Scanner Interface */}
          <div className="max-w-lg mx-auto">
            {!scanning ? (
              <div className="text-center">
                <div className="morphism border-2 border-dashed border-white/30 rounded-2xl p-16 mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-600/5"></div>
                  <div className="relative z-10">
                    <Camera className="h-20 w-20 text-white/40 mx-auto mb-6 floating" />
                    <p className="text-white/70 mb-8 text-lg">Ready to scan medical QR codes</p>
                    <button
                      onClick={startScanning}
                      className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 mx-auto card-3d"
                    >
                      <Scan className="h-6 w-6" />
                      <span>Start Scanning</span>
                      <Zap className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <div className="border-4 border-green-500 rounded-2xl overflow-hidden shadow-2xl neon-border">
                    <QrScanner
                      onDecode={handleScan}
                      onError={handleError}
                      containerStyle={{
                        width: '100%',
                        height: '350px',
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 border-2 border-green-400 rounded-2xl pointer-events-none">
                    <div className="absolute top-6 left-6 w-8 h-8 border-l-4 border-t-4 border-green-400 rounded-tl-lg"></div>
                    <div className="absolute top-6 right-6 w-8 h-8 border-r-4 border-t-4 border-green-400 rounded-tr-lg"></div>
                    <div className="absolute bottom-6 left-6 w-8 h-8 border-l-4 border-b-4 border-green-400 rounded-bl-lg"></div>
                    <div className="absolute bottom-6 right-6 w-8 h-8 border-r-4 border-b-4 border-green-400 rounded-br-lg"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-white/80 mb-6 text-lg">
                    Position the QR code within the frame
                  </p>
                  <button
                    onClick={stopScanning}
                    className="morphism border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    Stop Scanning
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mt-8 morphism border border-red-400/30 rounded-xl p-6 flex items-center space-x-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5"></div>
              <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-lg">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-8 morphism border border-green-400/30 rounded-xl p-6 flex items-center space-x-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5"></div>
              <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
              <p className="text-green-300 text-lg">{success}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-10 morphism border border-blue-400/30 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6">Scanning Instructions</h3>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1 text-xl">•</span>
                  <span className="text-lg">Ensure adequate lighting for optimal scanning</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1 text-xl">•</span>
                  <span className="text-lg">Hold device steady and position QR code within the frame</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1 text-xl">•</span>
                  <span className="text-lg">Only scan verified BioVerse medical QR codes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1 text-xl">•</span>
                  <span className="text-lg">Access is restricted to authorized emergency personnel</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};