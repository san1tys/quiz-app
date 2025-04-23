import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../student/services/student.service';
import { Quiz } from '../../../../models/quiz';

@Component({
  selector: 'app-quiz-play',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-play.component.html',
})
export class QuizPlayComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private studentService = inject(StudentService);

  quiz: Quiz | null = null;
  selectedAnswers: Record<number, number> = {};
  showResult = false;
  score = 0;

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('id');

    // Проверяем, что quizId не undefined
    if (!quizId) {
      console.error('Quiz ID not found');
      return; // или можно сделать редирект на другую страницу
    }

    // Если quizId есть, отправляем запрос
    this.studentService.getQuizById(quizId).subscribe({
      next: (data) => this.quiz = data,
      error: (err) => console.error('Ошибка при загрузке квиза:', err)
    });
  }

  submitQuiz() {
    if (!this.quiz) return;

    this.score = 0;

    this.quiz.questions.forEach((q, index) => {
      const selectedAnswerIndex = this.selectedAnswers[index]; // это number
      const correct = q.answer_choices.find(a => a.is_correct);

      if (correct && selectedAnswerIndex !== undefined && q.answer_choices[selectedAnswerIndex]?.is_correct) {
        this.score++;
      }
    });

    this.showResult = true;
  }
}
