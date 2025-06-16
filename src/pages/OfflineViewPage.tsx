import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, User, AlertTriangle, Pill, Phone, Calendar, Shield } from 'lucide-react';
import { PatientData } from '../types/PatientData';

export const OfflineViewPage: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cachedData, setCachedData] = useState<PatientData | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // Load cached data
    const loadCachedData = () => {
      try {
        const offlineData = localStorage.getItem('offlinePatientData');
        if (offlineData) {
          const data = JSON.parse(offlineData);
          setCachedData(data);
          setLastSync(data.cacheTime);
        }
      } catch (error) {
        console.error('Error loading cached data:', error);
      }
    };

    loadCachedData();

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Connection Status */}
      <div className={`p-4 rounded-xl mb-6 ${
        isOnline ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'
      }`}>
        <div className="flex items-center space-x-3">
          {isOnline ? (
            <Wifi className="h-6 w-6 text-green-600" />
          ) : (
            <WifiOff className="h-6 w-6 text-orange-600" />
          )}
          <div>
            <h3 className={`font-semibold ${
              isOnline ? 'text-green-900' : 'text-orange-900'
            }`}>
              {isOnline ? 'Online Mode' : 'Offline Mode'}
            </h3>
            <p className={`text-sm ${
              isOnline ? 'text-green-700' : 'text-orange-700'
            }`}>
              {isOnline 
                ? 'Connected to internet - Real-time data available'
                : 'No internet connection - Using cached medical data'
              }
            </p>
          </div>
        </div>
      </div>

      {cachedData ? (
        <>
          {/* HIPAA Compliance Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-xl">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">RESTRICTED MEDICAL INFORMATION (OFFLINE ACCESS)</h3>
                <p className="text-sm opacity-90">
                  HIPAA Protected - Authorized Emergency Personnel Only
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-b-xl shadow-lg p-8">
            {/* Patient Header */}
            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
              <div className="bg-blue-100 p-4 rounded-full">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{cachedData.name}</h1>
                <p className="text-gray-600">
                  Patient ID: {cachedData.id} • Age: {cachedData.age || 'Not specified'}
                </p>
                {!isOnline && (
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-orange-600">Cached Data</span>
                  </div>
                )}
              </div>
            </div>

            {/* Critical Information Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Blood Type */}
              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">B</span>
                  </div>
                  <h3 className="text-lg font-semibold text-red-900">Blood Type</h3>
                </div>
                <p className="text-2xl font-bold text-red-800">
                  {cachedData.bloodType || 'Not specified'}
                </p>
              </div>

              {/* Emergency Contact */}
              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Phone className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">Emergency Contact</h3>
                </div>
                {cachedData.emergencyContact ? (
                  <div>
                    <p className="text-lg font-semibold text-green-800">
                      {cachedData.emergencyContact}
                    </p>
                    {cachedData.emergencyPhone && (
                      <p className="text-green-700 font-mono">
                        <a href={`tel:${cachedData.emergencyPhone}`} className="hover:underline">
                          {cachedData.emergencyPhone}
                        </a>
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-green-700">Not specified</p>
                )}
              </div>
            </div>

            {/* Medical Information */}
            <div className="space-y-6">
              {/* Allergies */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-yellow-900">ALLERGIES</h3>
                </div>
                {cachedData.allergies ? (
                  <p className="text-yellow-800 leading-relaxed whitespace-pre-wrap">
                    {cachedData.allergies}
                  </p>
                ) : (
                  <p className="text-yellow-700 italic">No known allergies on record</p>
                )}
              </div>

              {/* Current Medications */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Pill className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">Current Medications</h3>
                </div>
                {cachedData.medications ? (
                  <p className="text-blue-800 leading-relaxed whitespace-pre-wrap">
                    {cachedData.medications}
                  </p>
                ) : (
                  <p className="text-blue-700 italic">No current medications on record</p>
                )}
              </div>

              {/* Medical Conditions */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <User className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-900">Medical Conditions</h3>
                </div>
                {cachedData.conditions ? (
                  <p className="text-purple-800 leading-relaxed whitespace-pre-wrap">
                    {cachedData.conditions}
                  </p>
                ) : (
                  <p className="text-purple-700 italic">No chronic conditions on record</p>
                )}
              </div>
            </div>

            {/* Footer Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Last updated: {new Date(cachedData.lastUpdated).toLocaleString()}</span>
                </div>
                {lastSync && (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Cached: {new Date(lastSync).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <WifiOff className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Cached Data Available</h2>
          <p className="text-gray-600 mb-6">
            No patient data has been cached for offline access. 
            Please connect to the internet and scan a QR code or access the admin panel to cache data.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">To enable offline access:</h3>
            <ol className="text-left text-blue-800 space-y-1">
              <li>1. Connect to the internet</li>
              <li>2. Scan a patient QR code or use the admin panel</li>
              <li>3. Data will be automatically cached for offline access</li>
            </ol>
          </div>
        </div>
      )}

      {/* Legal Notice */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-xs text-gray-600">
          This information is confidential and protected under HIPAA regulations. 
          Unauthorized access or disclosure is strictly prohibited. 
          {!isOnline && ' This data is cached locally and may not reflect the most recent updates.'}
        </p>
      </div>
    </div>
  );
};