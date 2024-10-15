import { Component, OnInit } from '@angular/core';
import { NurseService } from '../nurse.service';
import { Nurse } from '../Nurse.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nurse-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nurse-list.component.html',
  styleUrls: ['./nurse-list.component.css'],
})
export class NurseListComponent implements OnInit {
  nurses: Nurse[] = [];

  constructor(private nurseService: NurseService) {}

  ngOnInit(): void {
    this.nurseService.getNurses().subscribe((data: Nurse[]) => {
      this.nurses = data;
    });
  }

  deleteNurse(id: string): void {
    this.nurseService.deleteNurse(id).subscribe(() => {
      this.nurses = this.nurses.filter((nurse) => nurse.nurseId !== id);
    });
  }
}
