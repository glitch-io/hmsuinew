import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doctor-create.component.html',
  styleUrls: ['./doctor-create.component.css'],
})
export class DoctorCreateComponent {
  doctorForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private router: Router
  ) {
    this.doctorForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Contactno: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Ensuring Contactno is numeric
      Address: [''],
      MedicalHistory: [''],
      Image: [null],
    });
  }

  createDoctor(): void {
    const formData = new FormData();

    formData.append('Name', this.doctorForm.get('Name')?.value);
    formData.append('Contactno', this.doctorForm.get('Contactno')?.value);
    formData.append('Address', this.doctorForm.get('Address')?.value || '');
    formData.append(
      'MedicalHistory',
      this.doctorForm.get('MedicalHistory')?.value || ''
    );

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }

    this.doctorService.createDoctor(formData).subscribe({
      next: (response) => {
        console.log('Doctor created:', response);
        this.router.navigate(['/doctors']);
      },
      error: (error) => {
        console.error('Error creating doctor:', error);
        if (error.error?.errors) {
          console.error('Validation errors:', error.error.errors); // Log detailed validation errors
        } else {
          console.error('Unexpected error:', error);
        }
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/doctors']);
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
