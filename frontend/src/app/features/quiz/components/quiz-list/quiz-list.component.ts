import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizCardComponent } from '../quiz-card/quiz-card.component';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, QuizCardComponent],
  templateUrl: './quiz-list.component.html',
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe((data) => {
      this.quizzes = data;
    });
  }
}
