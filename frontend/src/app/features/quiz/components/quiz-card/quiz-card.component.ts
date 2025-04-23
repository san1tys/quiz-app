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
}