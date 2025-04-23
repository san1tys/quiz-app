import { inject, Injectable } from '@angular/core';
import { Quiz } from '../../../models/quiz';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizScore } from '../../../models/quiz-score';

@Injectable({
  providedIn: 'root'
})
export class TeacherQuizService {
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

  // Метод для создания квиза
  createQuiz(quiz: Quiz): Observable<Quiz> {
    console.log('Creating quiz:', quiz);
    return this.http.post<Quiz>(`${this.API_URL}create/`, quiz, { headers: this.getHeaders() });
  }

  // Метод для получения списка квизов
  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.API_URL}quizzes/`, { headers: this.getHeaders() });
  }

  getQuizScores(quizId: number): Observable<QuizScore[]> {
    return this.http.get<QuizScore[]>(`${this.API_URL}${quizId}/scores/`, {
      headers: this.getHeaders()
    });
  }

  getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.API_URL}${id}/`, {
      headers: this.getHeaders()
    });
  }

}
