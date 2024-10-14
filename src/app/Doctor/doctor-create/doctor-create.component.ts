import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Router } from '@angular/router';
import { Doctor } from '../Doctor.model';

@Component({
  selector: 'app-doctor-create',
  templateUrl: './doctor-create.component.html',
  styleUrls: ['./doctor-create.component.css'],
})
export class DoctorCreateComponent {
  doctor: Doctor = {
    doctorId: '',
    name: '',
    contactno: '',
    address: '',
    medicalHistory: '',
    doctorImg: '',
    appointments: [],
  };

  constructor(private doctorService: DoctorService, private router: Router) {}

  createDoctor(): void {
    this.doctorService.createDoctor(this.doctor).subscribe(() => {
      this.router.navigate(['/doctors']);
    });
  }
}
