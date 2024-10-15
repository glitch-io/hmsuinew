import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PatientService } from '../patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../patient.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css'],
})
export class PatientEditComponent implements OnInit {
  patientForm: FormGroup;
  selectedFile: File | null = null;
  patient: Patient | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.patientForm = this.formBuilder.group({
      name: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Only numbers
      address: [''],
      medicalHistory: [''],
      image: [null],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
        this.patientService.getPatientById(+id).subscribe((data: Patient) => {
          this.patient = data;
          this.patientForm.patchValue({
            name: data.name,
            contactNumber: data.contactNumber,
            address: data.address,
            medicalHistory: data.medicalHistory,
          });
        });
      } else {
        // Handle the case where id is null, e.g., navigate back or show an error
        console.error('Patient ID not found in route parameters.');
        this.router.navigate(['/patients']);
      }
      
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.patientForm.get('name')?.value);
    formData.append('contactNumber', this.patientForm.get('contactNumber')?.value);
    formData.append('address', this.patientForm.get('address')?.value || '');
    formData.append('medicalHistory', this.patientForm.get('medicalHistory')?.value || '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    if (this.patient) {
        this.patientService.updatePatient(this.patient.patientId, formData).subscribe({
          next: () => this.router.navigate(['/patients']),
          error: (error) => console.error('Error updating patient:', error),
        });
      } else {
        // Handle the case where patient is null
        console.error('Patient data is not available for updating.');
      }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.patientForm.patchValue({
          image: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.router.navigate(['/patients']);
  }
}
