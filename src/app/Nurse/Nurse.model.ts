export interface Nurse {
    nurseId: string;
    name: string;
    contactno: string;
    address: string;
    medicalHistory: string;
    nurseImg: string;
    appointments?: Appointment[]; // Assuming you have an Appointment interface defined
  }
  
  export interface CreateNurse {
    Name: string;
    Contactno: string;
    Address: string;
    MedicalHistory: string;
    Image: File;
  }
  