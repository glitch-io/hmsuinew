import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDoctor, Doctor } from './Doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'https://localhost:7215/api/doctor';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}`);
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
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
