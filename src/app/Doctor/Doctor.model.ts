export interface Doctor {
    doctorId: string;        // Equivalent to Guid in C#
    name: string;
    contactno: string;       // Updated camel case to follow TypeScript convention
    address: string;
    medicalHistory: string;
    doctorImg: string;  // byte[] in C# can be represented as ArrayBuffer in TypeScript
    appointments?: Appointment[];  // Assuming you have an Appointment interface/model defined
  }
  export interface Appointment {
    appointmentId: number;       // Equivalent to int in C#
    appointmentDate: Date;        // Equivalent to DateTime in C#
    reason: string;
    
    // Foreign Keys
    patientId: number;            // Equivalent to int in C#
    patient: Patient;             // Assuming you have a Patient interface/model defined
  
    doctorId: number;             // Equivalent to int in C#
    doctor: Doctor;               // Assuming you have the Doctor interface/model defined
  }
  export interface Patient {
    patientId: number;             // Equivalent to int in C#
    name: string;
    dateOfBirth: Date;             // Equivalent to DateTime in C#
    gender: string;
    contactNumber: string;
    address: string;
    medicalHistory: string;
    image: ArrayBuffer;            // Equivalent to byte[] in C#
    patientType: PatientType;      // Reference to PatientType enum
    appointments: Appointment[];   // Assuming Appointment interface is already defined
  }
  export enum PatientType {
    Inpatient = 'Inpatient',      // Enum values as strings
    Outpatient = 'Outpatient'
  }
        