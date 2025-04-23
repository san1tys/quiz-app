import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../../../models/quiz';
import { AnswerSubmission } from '../../../models/answer-submission';
import { QuizScore } from '../../../models/quiz-score';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  http = inject(HttpClient);

  
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

  getQuizById(id: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.API_URL}${id}/`, {
      headers: this.getHeaders()
    });
  }

  submitAnswers(quizId: string, selectedAnswers : any) : Observable<QuizScore> {
    const payload = { answers: selectedAnswers };
    return this.http.post<QuizScore>(`${this.API_URL}my-quizzes/${quizId}/submit/`, payload, {
      headers: this.getHeaders()
    });
  }
}
