import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../../../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class StdudentService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://127.0.0.1:8000/api/quiz/';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Token not found');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.API_URL}quizzes/`, { headers: this.getHeaders() });
  }
  
}
