import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NurseService } from '../nurse.service';
import { Nurse, NurseViewModel } from '../Nurse.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nurse-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nurse-detail.component.html',
  styleUrls: ['./nurse-detail.component.css'],
})
export class NurseDetailsComponent implements OnInit {
  nurse!: NurseViewModel;

  constructor(
    private nurseService: NurseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.nurseService.getNurseById(id).subscribe({
        next: (data: NurseViewModel) => {
          this.nurse = data;
          console.log(this.nurse);
        },
        error: (error) => console.error('Error fetching nurse details:', error),
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/nurses']);
  }
}
