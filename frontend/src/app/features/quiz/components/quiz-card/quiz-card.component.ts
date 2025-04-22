import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class QuizCardComponent {
  @Input() id!: number;
  @Input() title!: string;
  @Input() questionCount!: number;

  constructor(private router: Router) { }

  goToDetail() {
    this.router.navigate(['/quiz', this.id]);
  }
}
