import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NurseService } from '../nurse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Nurse } from '../Nurse.model';
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
  nurse: Nurse | null = null;

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
      this.nurseService.getNurseById(id).subscribe((data: Nurse) => {
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
    const formData
