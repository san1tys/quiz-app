import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quiz } from '../../../../models/quiz';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss',
})
export class QuizCardComponent {
  @Input() quiz!: Quiz;
  userString = localStorage.getItem('user');
  user = JSON.parse(this.userString!);
  role = this.user.role;
}