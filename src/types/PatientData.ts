export interface PatientData {
  id: string;
  name: string;
  age: string;
  bloodType: string;
  allergies: string;
  medications: string;
  conditions: string;
  emergencyContact: string;
  emergencyPhone: string;
  lastUpdated: string;
}

export interface EncryptedPatientData {
  id: string;
  encryptedData: string;
  timestamp: string;
}