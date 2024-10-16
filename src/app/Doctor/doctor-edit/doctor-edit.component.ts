import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, DoctorViewModel } from '../Doctor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css'],
})
export class DoctorEditComponent implements OnInit {
  doctorForm: FormGroup;
  selectedFile: File | null = null;
  doctor: DoctorViewModel | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.doctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      contactno: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Only numbers
      address: [''],
      medicalHistory: [''],
      doctorImg: [null],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.doctorService
        .getDoctorById(id)
        .subscribe((data: DoctorViewModel) => {
          this.doctor = data;
          this.doctorForm.patchValue({
            name: data.name,
            contactno: data.contactno,
            address: data.address,
            medicalHistory: data.medicalHistory,
          });
        });
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('Name', this.doctorForm.get('name')?.value);
    formData.append('Contactno', this.doctorForm.get('contactno')?.value);
    formData.append('Address', this.doctorForm.get('address')?.value || '');
    formData.append(
      'MedicalHistory',
      this.doctorForm.get('medicalHistory')?.value || ''
    );

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }

    if (this.doctor) {
      this.doctorService.updateDoctor(this.doctor.id, formData).subscribe({
        next: () => this.router.navigate(['/doctors']),
        error: (error) => console.error('Error updating doctor:', error),
      });
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.doctorForm.patchValue({
          doctorImg: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.router.navigate(['/doctors']);
  }
}
