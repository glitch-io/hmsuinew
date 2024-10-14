import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Doctor } from '../Doctor.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-doctor-edit',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {
  doctor: Doctor = {
    doctorId: '',
    name: '',
    contactno: '',
    address: '',
    medicalHistory: '',
    doctorImg: '',
    appointments: []
  };

  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get doctorId from the route params
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.doctorService.getDoctorById(id).subscribe((data: Doctor) => {
        this.doctor = data;
      });
    }
  }

  onSubmit(): void {
    this.doctorService.updateDoctor(this.doctor.doctorId, this.doctor)
      .subscribe(() => {
        this.router.navigate(['/doctors']);  // Navigate back to the doctor list
      });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.doctor.doctorImg = e.target.result; // Base64 string
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.router.navigate(['/doctors']);
  }
}
