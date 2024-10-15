import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css'],
})
export class PatientCreateComponent {
  patientForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router
  ) {
    this.patientForm = this.formBuilder.group({
      Name: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Gender: ['', Validators.required],
      ContactNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Address: [''],
      MedicalHistory: [''],
      Image: [null],
    });
  }

  createPatient(): void {
    const formData = new FormData();

    formData.append('Name', this.patientForm.get('Name')?.value);
    formData.append('DateOfBirth', this.patientForm.get('DateOfBirth')?.value);
    formData.append('Gender', this.patientForm.get('Gender')?.value);
    formData.append('ContactNumber', this.patientForm.get('ContactNumber')?.value);
    formData.append('Address', this.patientForm.get('Address')?.value || '');
    formData.append('MedicalHistory', this.patientForm.get('MedicalHistory')?.value || '');

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }

    this.patientService.createPatient(formData).subscribe({
      next: (response) => {
        console.log('Patient created:', response);
        this.router.navigate(['/patients']);
      },
      error: (error) => {
        console.error('Error creating patient:', error);
        if (error.error?.errors) {
          console.error('Validation errors:', error.error.errors);
        } else {
          console.error('Unexpected error:', error);
        }
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/patients']);
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
