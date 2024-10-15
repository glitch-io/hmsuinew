import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateNurse, Nurse } from './Nurse.model';

@Injectable({
  providedIn: 'root',
})
export class NurseService {
  private apiUrl = 'https://localhost:7215/api/nurse';

  constructor(private http: HttpClient) {}

  getNurses(): Observable<Nurse[]> {
    return this.http.get<Nurse[]>(`${this.apiUrl}`);
  }

  getNurseById(id: string): Observable<Nurse> {
    return this.http.get<Nurse>(`${this.apiUrl}/${id}`);
  }

  createNurse(nurse: FormData): Observable<CreateNurse> {
    return this.http.post<CreateNurse>(this.apiUrl, nurse);
  }

  updateNurse(id: string, nurse: FormData): Observable<Nurse> {
    return this.http.put<Nurse>(`${this.apiUrl}/${id}`, nurse);
  }

  deleteNurse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
