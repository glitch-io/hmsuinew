import { Routes } from '@angular/router';
import { DoctorListComponent } from './Doctor/doctor-list/doctor-list.component';
import { DoctorCreateComponent } from './Doctor/doctor-create/doctor-create.component';
import { DoctorEditComponent } from './Doctor/doctor-edit/doctor-edit.component';
import { DoctorDetailsComponent } from './Doctor/doctor-details/doctor-details.component';
import { NurseDetailsComponent } from './Nurse/nurse-details/nurse-detail.component';
import { NurseListComponent } from './Nurse/nurse-list/nurse-list.component';
import { NurseEditComponent } from './Nurse/nurse-edit/nurse-edit.component';
import { NurseCreateComponent } from './Nurse/nurse-create/nurse-create.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nurses', component: NurseListComponent },
  { path: 'nurses/details/:id', component: NurseDetailsComponent },
  { path: 'nurses/edit/:id', component: NurseEditComponent },
  { path: 'nurses/create', component: NurseCreateComponent },
  { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/create', component: DoctorCreateComponent },
  { path: 'doctors/edit/:id', component: DoctorEditComponent },
  { path: 'doctors/details/:id', component: DoctorDetailsComponent },
];
