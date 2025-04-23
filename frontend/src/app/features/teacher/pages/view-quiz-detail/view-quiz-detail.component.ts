import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherQuizService } from '../../services/teacher-quiz.service';
import { Quiz } from '../../../../models/quiz';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-quiz-detail',
  templateUrl: './view-quiz-detail.component.html',
  imports: [CommonModule],
})
export class ViewQuizDetailComponent implements OnInit {
  quizId!: number;
  quiz?: Quiz;

  constructor(
    private route: ActivatedRoute,
    private quizService: TeacherQuizService
  ) { }

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('id')!;
    this.quizService.getQuizById(this.quizId).subscribe({
      next: (quizData) => this.quiz = quizData,
      error: (err) => console.error('Failed to load quiz:', err)
    });
  }
}
