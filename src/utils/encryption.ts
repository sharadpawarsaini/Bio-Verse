import CryptoJS from 'crypto-js';
import { PatientData, EncryptedPatientData } from '../types/PatientData';

// In a production environment, this should be stored securely
const ENCRYPTION_KEY = 'BioVerse-Medical-Encryption-Key-2024';

export const generatePatientId = (): string => {
  return 'BV-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const encryptData = (data: PatientData): EncryptedPatientData => {
  try {
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
    
    return {
      id: data.id,
      encryptedData: encrypted,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt patient data');
  }
};

export const decryptData = (encryptedData: EncryptedPatientData): PatientData => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData.encryptedData, ENCRYPTION_KEY);
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedString) {
      throw new Error('Invalid decryption key or corrupted data');
    }
    
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt patient data - Access denied');
  }
};

export const hashPatientId = (patientId: string): string => {
  return CryptoJS.SHA256(patientId + ENCRYPTION_KEY).toString();
};