import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, AlertTriangle, Pill, Phone, Calendar, Shield, Heart } from 'lucide-react';
import { decryptData } from '../utils/encryption';
import { PatientData } from '../types/PatientData';

export const PatientViewPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessTime] = useState(new Date().toISOString());

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        if (!patientId) {
          setError('Invalid patient ID');
          return;
        }

        // Try to load encrypted data from localStorage
        const encryptedData = localStorage.getItem(`patient_${patientId}`);
        
        if (encryptedData) {
          const decryptedData = decryptData(JSON.parse(encryptedData));
          setPatientData(decryptedData);
        } else {
          // Try to load from current patient (for demo purposes)
          const currentPatient = localStorage.getItem('currentPatient');
          if (currentPatient) {
            const data = JSON.parse(currentPatient);
            if (data.id === patientId) {
              setPatientData(data);
            } else {
              setError('Patient data not found. This may be a new or invalid QR code.');
            }
          } else {
            setError('Patient data not found. This may be a new or invalid QR code.');
          }
        }
      } catch (err) {
        console.error('Error loading patient data:', err);
        setError('Failed to decrypt patient data. Access denied.');
      } finally {
        setLoading(false);
      }
    };

    loadPatientData();
  }, [patientId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Decrypting patient data...</p>
        </div>
      </div>
    );
  }

  if (error || !patientData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-900 mb-2">Access Denied</h2>
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* HIPAA Compliance Header */}
      <div className="bg-red-600 text-white p-4 rounded-t-xl">
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6" />
          <div>
            <h3 className="font-semibold">RESTRICTED MEDICAL INFORMATION</h3>
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
            <h1 className="text-3xl font-bold text-gray-900">{patientData.name}</h1>
            <p className="text-gray-600">
              Patient ID: {patientData.id} • Age: {patientData.age || 'Not specified'}
            </p>
          </div>
        </div>

        {/* Critical Information */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Blood Type */}
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Heart className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-red-900">Blood Type</h3>
            </div>
            <p className="text-2xl font-bold text-red-800">
              {patientData.bloodType || 'Not specified'}
            </p>
          </div>

          {/* Emergency Contact */}
          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Phone className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">Emergency Contact</h3>
            </div>
            {patientData.emergencyContact ? (
              <div>
                <p className="text-lg font-semibold text-green-800">
                  {patientData.emergencyContact}
                </p>
                {patientData.emergencyPhone && (
                  <p className="text-green-700 font-mono">
                    <a href={`tel:${patientData.emergencyPhone}`} className="hover:underline">
                      {patientData.emergencyPhone}
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
            {patientData.allergies ? (
              <p className="text-yellow-800 leading-relaxed whitespace-pre-wrap">
                {patientData.allergies}
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
            {patientData.medications ? (
              <p className="text-blue-800 leading-relaxed whitespace-pre-wrap">
                {patientData.medications}
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
            {patientData.conditions ? (
              <p className="text-purple-800 leading-relaxed whitespace-pre-wrap">
                {patientData.conditions}
              </p>
            ) : (
              <p className="text-purple-700 italic">No chronic conditions on record</p>
            )}
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {new Date(patientData.lastUpdated).toLocaleString()}</span>
          </div>
          <div className="text-sm text-gray-500">
            Accessed: {new Date(accessTime).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Legal Notice */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-xs text-gray-600">
          This information is confidential and protected under HIPAA regulations. 
          Unauthorized access or disclosure is strictly prohibited and may result in legal action.
        </p>
      </div>
    </div>
  );
};