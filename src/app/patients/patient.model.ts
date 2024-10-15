export interface Patient {
    patientId: number; // Equivalent to int in C#
    name: string;
    dateOfBirth: Date; // Equivalent to DateTime in C#
    gender: string;
    contactNumber: string;
    address: string;
    medicalHistory: string;
    image: ArrayBuffer | null; // Equivalent to byte[] in C#
    patientType: PatientType; // Reference to PatientType enum
    appointments?: Appointment[]; // Assuming Appointment interface is defined
  }
  
  export interface CreatePatient {
    name: string;
    dateOfBirth: Date; // Equivalent to DateTime in C#
    gender: string;
    contactNumber: string;
    address: string;
    medicalHistory: string;
    image?: File; // Optional, if applicable
  }
  
  export interface Appointment {
    appointmentId: number; // Equivalent to int in C#
    appointmentDate: Date; // Equivalent to DateTime in C#
    reason: string;
  
    // Foreign Keys
    patientId: number; // Equivalent to int in C#
    patient: Patient; // Assuming Patient interface is defined
  
    doctorId: number; // Equivalent to int in C#
    doctor: Doctor; // Assuming Doctor interface is defined
  }
  export interface Doctor {
    doctorId: number;
    name: string;
    specialty: string; // Add other necessary fields
    // other properties...
}

  
  export enum PatientType {
    Inpatient = 'Inpatient', // Enum values as strings
    Outpatient = 'Outpatient',
  }
  
