import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz-detail.component.html',
})
export class QuizDetailComponent {
  quizId!: number;

  constructor(private route: ActivatedRoute) {
    this.quizId = +this.route.snapshot.paramMap.get('id')!;
  }
}