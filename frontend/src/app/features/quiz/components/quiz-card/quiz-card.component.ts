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
  userString = localStorage.getItem('user');
  user = JSON.parse(this.userString!);
  role = this.user.role;
  isEnrolled = false;
  studentQuizService = inject(StudentService);
  enroll() {
    this.studentQuizService.enrollInQuiz(this.quiz.id!).subscribe({
      next: () => {
        this.isEnrolled = true;
        alert('Enrolled successfully!');
      },
      error: (err) => {
        alert('Failed to enroll.');
        console.log(err);

      }
    });
  }
}