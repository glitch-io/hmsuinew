import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDoctor, Doctor, DoctorViewModel } from './Doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'https://localhost:7215/api/doctor';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<DoctorViewModel[]> {
    return this.http.get<DoctorViewModel[]>(`${this.apiUrl}`);
  }

  getDoctorById(id: string): Observable<DoctorViewModel> {
    return this.http.get<DoctorViewModel>(`${this.apiUrl}/${id}`);
  }

  createDoctor(doctor: FormData) {
    return this.http.post<CreateDoctor>(this.apiUrl, doctor);
  }

  updateDoctor(id: string, doctor: FormData): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor);
  }

  deleteDoctor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
