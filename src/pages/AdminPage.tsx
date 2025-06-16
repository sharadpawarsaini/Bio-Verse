import React, { useState, useEffect } from 'react';
import { QrCode, Save, User, AlertTriangle, Phone, Pill, Calendar, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { encryptData, generatePatientId } from '../utils/encryption';
import { PatientData } from '../types/PatientData';

export const AdminPage: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientData>({
    id: '',
    name: '',
    age: '',
    bloodType: '',
    allergies: '',
    medications: '',
    conditions: '',
    emergencyContact: '',
    emergencyPhone: '',
    lastUpdated: new Date().toISOString(),
  });

  const [qrGenerated, setQrGenerated] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load existing data if available
    const savedData = localStorage.getItem('currentPatient');
    if (savedData) {
      setPatientData(JSON.parse(savedData));
    } else {
      // Generate new patient ID for new patients
      setPatientData(prev => ({ ...prev, id: generatePatientId() }));
    }
  }, []);

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setPatientData(prev => ({
      ...prev,
      [field]: value,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Encrypt sensitive data
      const encryptedData = encryptData(patientData);
      
      // Save to localStorage (in production, this would be a secure database)
      localStorage.setItem(`patient_${patientData.id}`, JSON.stringify(encryptedData));
      localStorage.setItem('currentPatient', JSON.stringify(patientData));
      
      // Cache for offline access
      const offlineData = {
        ...patientData,
        cached: true,
        cacheTime: new Date().toISOString(),
      };
      localStorage.setItem('offlinePatientData', JSON.stringify(offlineData));
      
      setQrGenerated(true);
    } catch (error) {
      console.error('Error saving patient data:', error);
    } finally {
      setSaving(false);
    }
  };

  const qrValue = `${window.location.origin}/view/${patientData.id}`;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="morphism rounded-2xl p-10 border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-10">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl shadow-lg floating">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Patient Medical Profile</h1>
              <p className="text-white/70 text-lg">Secure medical information management</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Patient Information Form */}
            <div className="space-y-8">
              <div className="morphism border border-yellow-400/30 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5"></div>
                <div className="relative z-10 flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                  <span className="text-lg font-semibold text-white">
                    Patient ID: <span className="gradient-text">{patientData.id}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={patientData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-4 morphism border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-white/50 transition-all duration-300"
                    placeholder="Enter patient name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">
                    Age
                  </label>
                  <input
                    type="number"
                    value={patientData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-4 py-4 morphism border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-white/50 transition-all duration-300"
                    placeholder="Age"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-3">
                  Blood Type *
                </label>
                <select
                  value={patientData.bloodType}
                  onChange={(e) => handleInputChange('bloodType', e.target.value)}
                  className="w-full px-4 py-4 morphism border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all duration-300"
                  required
                >
                  <option value="" className="bg-gray-800">Select Blood Type</option>
                  <option value="A+" className="bg-gray-800">A+</option>
                  <option value="A-" className="bg-gray-800">A-</option>
                  <option value="B+" className="bg-gray-800">B+</option>
                  <option value="B-" className="bg-gray-800">B-</option>
                  <option value="AB+" className="bg-gray-800">AB+</option>
                  <option value="AB-" className="bg-gray-800">AB-</option>
                  <option value="O+" className="bg-gray-800">O+</option>
                  <option value="O-" className="bg-gray-800">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                  Allergies
                </label>
                <textarea
                  value={patientData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  className="w-full px-4 py-4 morphism border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-white/50 transition-all duration-300"
                  rows={4}
                  placeholder="List any known allergies (medications, food, environmental)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-3 flex items-center">
                  <Pill className="h-5 w-5 mr-2 text-blue-400" />
                  Current Medications
                </label>
                <textarea
                  value={patientData.medications}
                  onChange={(e) => handleInputChange('medications', e.target.value)}
                  className="w-full px-4 py-4 morphism border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-white/50 transition-all duration-300"
                  rows={4}
                  placeholder="List current medications and dosages"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-3">
                  Medical Conditions
                </label>
                <textarea
                  value={patientData.conditions}
                  onChange={(e) => handleInputChange('conditions', e.target.value)}
                  className="w-full px-4 py-4 morphism border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-white/50 transition-all duration-300"
                  rows={4}
                  placeholder="List chronic conditions, diseases, or relevant medical history"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-green-400" />
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    value={patientData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="w-full px-4 py-4 morphism border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-white/50 transition-all duration-300"
                    placeholder="Contact name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">
                    Emergency Phone
                  </label>
                  <input
                    type="tel"
                    value={patientData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    className="w-full px-4 py-4 morphism border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-white/50 transition-all duration-300"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={!patientData.name || !patientData.bloodType || saving}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 card-3d"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Save className="h-6 w-6" />
                    <span>Save & Generate QR Code</span>
                    <Sparkles className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            {/* QR Code Display */}
            <div className="morphism rounded-xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-600/5"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                  <QrCode className="h-7 w-7 text-purple-400" />
                  <span>Medical QR Code</span>
                </h3>

                {qrGenerated && patientData.name ? (
                  <div className="text-center">
                    <div className="morphism p-8 rounded-2xl mb-6 inline-block border border-white/20 card-3d">
                      <QRCodeSVG
                        value={qrValue}
                        size={220}
                        bgColor="transparent"
                        fgColor="#ffffff"
                        level="H"
                        includeMargin={true}
                      />
                    </div>
                    <p className="text-white/80 mb-6 leading-relaxed">
                      This QR code contains encrypted medical information for emergency access.
                      Print and attach to medical bracelet or ID card.
                    </p>
                    <div className="morphism p-4 rounded-xl border border-white/20">
                      <p className="text-sm text-white/70 break-all">
                        <strong className="text-white">URL:</strong> {qrValue}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <QrCode className="h-20 w-20 text-white/30 mx-auto mb-6 floating" />
                    <p className="text-white/60 text-lg">
                      Save patient information to generate QR code
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {patientData.lastUpdated && (
            <div className="mt-8 text-sm text-white/60 flex items-center space-x-3">
              <Calendar className="h-5 w-5" />
              <span>Last updated: {new Date(patientData.lastUpdated).toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};