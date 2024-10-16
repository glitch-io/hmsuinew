import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Doctor, DoctorViewModel } from '../Doctor.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
})
export class DoctorListComponent implements OnInit {
  doctors: DoctorViewModel[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe((data: DoctorViewModel[]) => {
      this.doctors = data;
    });
  }

  deleteDoctor(id: string): void {
    this.doctorService.deleteDoctor(id).subscribe(() => {
      this.doctors = this.doctors.filter((doctor) => doctor.id !== id);
    });
  }
}
