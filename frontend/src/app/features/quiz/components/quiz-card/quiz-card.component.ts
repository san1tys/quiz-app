import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quiz } from '../../../../models/quiz';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../../student/services/student.service';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.scss',
})
export class QuizCardComponent {


  @Input() quiz!: Quiz;
  @Input() mode: 'my-quizzes' | 'all-quizzes' = 'all-quizzes'

  private studentQuizService = inject(StudentService);

  userString = localStorage.getItem('user');
  user = this.userString ? JSON.parse(this.userString) : null;
  role = this.user?.role ?? '';
  isEnrolled = false;

  play() {
      throw new Error('Method not implemented.');
  }

  enroll() {
    if (!this.quiz.id) return;

    this.studentQuizService.enrollInQuiz(this.quiz.id).subscribe({
      next: () => {
        this.isEnrolled = true;
        alert('Enrolled successfully!');
      },
      error: (err) => {
        if (err?.error?.detail === 'Already enrolled.') {
          this.isEnrolled = true;
          alert('You are already enrolled!');
        } else {
          alert('Failed to enroll.');
          console.error(err);
        }
      }
    });
  }

}
