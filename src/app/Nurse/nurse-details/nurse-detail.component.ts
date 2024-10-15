import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NurseService } from '../nurse.service';
import { Nurse } from '../Nurse.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nurse-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nurse-details.component.html',
  styleUrls: ['./nurse-details.component.css'],
})
export class NurseDetailsComponent implements OnInit {
  nurse: Nurse | null = null;

  constructor(
    private nurseService: NurseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.nurseService.getNurseById(id).subscribe({
        next: (data: Nurse) => (this.nurse = data),
        error: (error) =>
          console.error('Error fetching nurse details:', error),
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/nurses']);
  }
}
