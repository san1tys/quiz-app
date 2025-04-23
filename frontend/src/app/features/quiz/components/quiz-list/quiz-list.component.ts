import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizCardComponent } from '../quiz-card/quiz-card.component';
import { Quiz } from '../../../../models/quiz';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, QuizCardComponent],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss'
})
export class QuizListComponent {
  @Input() quizzes: Quiz[] = [];
  @Input() mode: 'my-quizzes' | 'all-quizzes' = 'all-quizzes'


  onUnenrolled(id: string) {
    console.log('Удаляю id:', id);
console.log('До удаления:', this.quizzes);

this.quizzes = this.quizzes.filter(q => q.id !== id);

console.log('После удаления:', this.quizzes);
  
  }
}
