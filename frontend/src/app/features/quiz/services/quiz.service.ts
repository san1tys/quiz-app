// quiz.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../user/auth/services/auth.service';

export interface Quiz {
  id: number;
  title: string;
  question_count: number;
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'http://127.0.0.1:8000/api/quiz/quizzes/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getQuizzes(): Observable<Quiz[]> {
    const token = this.authService.getAccessToken();  // Получаем токен через AuthService

    if (!token) {
      throw new Error('Нет авторизации, токен не найден');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });

    return this.http.get<Quiz[]>(this.apiUrl, { headers });
  }
}
