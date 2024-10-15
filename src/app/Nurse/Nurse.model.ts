import { Appointment } from '../Doctor/Doctor.model';

export interface NurseViewModel {
  id: string;
  name: string;
  contactno: string;
  address: string;
  medicalHistory: string;
  nurseImgBase64: string;
}

export interface Nurse {
  nurseId: string;
  name: string;
  contactno: string;
  address: string;
  medicalHistory: string;
  nurseImg: string;
  appointments?: Appointment[];
}

export interface CreateNurse {
  Name: string;
  Contactno: string;
  Address: string;
  MedicalHistory: string;
  Image: File;
}
