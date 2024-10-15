import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../Doctor.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
})
export class DoctorDetailsComponent implements OnInit {
  doctor: Doctor | null = null;

  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.doctorService.getDoctorById(id).subscribe({
        next: (data: Doctor) => (this.doctor = data),
        error: (error) =>
          console.error('Error fetching doctor details:', error),
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/doctors']);
  }
}
