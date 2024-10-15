import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NurseService } from '../nurse.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nurse-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nurse-create.component.html',
  styleUrls: ['./nurse-create.component.css'],
})
export class NurseCreateComponent {
  nurseForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private nurseService: NurseService,
    private router: Router
  ) {
    this.nurseForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Contactno: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Address: [''],
      MedicalHistory: [''],
      Image: [null],
    });
  }

  createNurse(): void {
    const formData = new FormData();
    formData.append('Name', this.nurseForm.get('Name')?.value);
    formData.append('Contactno', this.nurseForm.get('Contactno')?.value);
    formData.append('Address', this.nurseForm.get('Address')?.value || '');
    formData.append(
      'MedicalHistory',
      this.nurseForm.get('MedicalHistory')?.value || ''
    );

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }

    this.nurseService.createNurse(formData).subscribe({
      next: (response) => {
        console.log('Nurse created:', response);
        this.router.navigate(['/nurses']);
      },
      error: (error) => {
        console.error('Error creating nurse:', error);
      },
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onCancel(): void {
    this.router.navigate(['/nurses']);
  }
}
