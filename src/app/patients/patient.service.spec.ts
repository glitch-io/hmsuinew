import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PatientService } from './patient.service';
import { Patient, PatientType } from './patient.model';

describe('PatientService', () => {
  let service: PatientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PatientService],
    });

    service = TestBed.inject(PatientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a patient by ID', () => {
    const mockPatient: Patient = { 
        patientId: 1, 
        name: 'John Doe', 
        dateOfBirth: new Date('1990-01-01'), 
        gender: 'Male', 
        contactNumber: '1234567890', 
        address: '123 Main St', 
        medicalHistory: 'No known allergies', 
        image: null, 
        patientType: PatientType.Outpatient, // Use the enum value here
        appointments: [] 
      };

    service.getPatientById('1').subscribe((patient) => {
      expect(patient).toEqual(mockPatient);
    });

    const req = httpMock.expectOne(`api/patients/1`); // Adjust the URL as needed
    expect(req.request.method).toBe('GET');
    req.flush(mockPatient);
  });

  // Additional tests for other methods in PatientService can be added here
});
