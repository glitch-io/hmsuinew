import { Routes } from '@angular/router';
import { DoctorListComponent } from './Doctor/doctor-list/doctor-list.component';
import { DoctorCreateComponent } from './Doctor/doctor-create/doctor-create.component';
import { DoctorEditComponent } from './Doctor/doctor-edit/doctor-edit.component';
import { DoctorDetailsComponent } from './Doctor/doctor-details/doctor-details.component';

export const routes: Routes = [
    { path: 'doctors', component: DoctorListComponent },
  { path: 'doctors/create', component: DoctorCreateComponent },
  { path: 'doctors/edit/:id', component: DoctorEditComponent },
  { path: 'doctors/details/:id', component: DoctorDetailsComponent },
];
