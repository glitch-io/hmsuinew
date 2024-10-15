import { Component, OnInit } from '@angular/core';
import { NurseService } from '../nurse.service';
import { Nurse, NurseViewModel } from '../Nurse.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-nurse-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nurse-list.component.html',
  styleUrls: ['./nurse-list.component.css'],
})
export class NurseListComponent implements OnInit {
  nurses: NurseViewModel[] = [];

  constructor(private nurseService: NurseService) {}

  ngOnInit(): void {
    this.nurseService.getNurses().subscribe((data: NurseViewModel[]) => {
      this.nurses = data;
      console.log(data);
    });
  }

  deleteNurse(id: string): void {
    this.nurseService.deleteNurse(id).subscribe(() => {
      this.nurses = this.nurses.filter((nurse) => nurse.id !== id);
    });
  }
}
