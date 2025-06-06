import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../../../models/quiz';
import { AnswerSubmission } from '../../../models/answer-submission';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://127.0.0.1:8000/api/quiz/';

  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      console.error('Token not found');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.API_URL}quizzes/`, {
      headers: this.getHeaders()
    });
  }

  enrollInQuiz(quizId: string): Observable<any> {
    return this.http.post(`${this.API_URL}${quizId}/enroll/`, {}, {
      headers: this.getHeaders()
    });
  }

  unEnrollInQuiz(quizId: string): Observable<any> {
    return this.http.post(`${this.API_URL}${quizId}/unenroll/`, {}, {
      headers: this.getHeaders()
    });
  }

  getEnrolledQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.API_URL}my-quizzes/`, {
      headers: this.getHeaders()
    });
  }

}
