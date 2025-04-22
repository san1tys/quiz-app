import { inject, Injectable } from '@angular/core';
import { Quiz } from '../../../models/quiz';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherQuizService {
  http = inject(HttpClient);
  readonly API_URL = 'http://127.0.0.1:8000/api/quiz/';

  createQuiz(quiz : Quiz) {
    console.log('Creating quiz:', quiz);
    return this.http.post(this.API_URL, quiz);
  }
}

