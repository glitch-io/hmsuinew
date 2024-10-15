import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NurseService } from '../nurse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Nurse, NurseViewModel } from '../Nurse.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nurse-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nurse-edit.component.html',
  styleUrls: ['./nurse-edit.component.css'],
})
export class NurseEditComponent implements OnInit {
  nurseForm: FormGroup;
  selectedFile: File | null = null;
  nurse: NurseViewModel | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private nurseService: NurseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.nurseForm = this.formBuilder.group({
      name: ['', Validators.required],
      contactno: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Only numbers
      address: [''],
      medicalHistory: [''],
      nurseImg: [null],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.nurseService.getNurseById(id).subscribe((data: NurseViewModel) => {
        this.nurse = data;
        this.nurseForm.patchValue({
          name: data.name,
          contactno: data.contactno,
          address: data.address,
          medicalHistory: data.medicalHistory,
        });
      });
    }
  }

  onSubmit(): void {
    if (this.nurseForm.invalid) {
      return; // If the form is invalid, do nothing
    }

    const formData = new FormData();
    formData.append('name', this.nurseForm.get('name')?.value);
    formData.append('contactno', this.nurseForm.get('contactno')?.value);
    formData.append('address', this.nurseForm.get('address')?.value);
    formData.append(
      'medicalHistory',
      this.nurseForm.get('medicalHistory')?.value
    );

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }

    this.nurseService
      .updateNurse(this.route.snapshot.paramMap.get('id')!, formData)
      .subscribe({
        next: () => {
          console.log('Nurse details updated successfully');
          this.router.navigate(['/nurses']); // Navigate back to the nurse list
        },
        error: (error) => {
          console.error('Error updating nurse details:', error);
        },
      });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.nurseForm.patchValue({
          nurseImg: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.router.navigate(['/nurses']);
  }
}
