import { Component, inject } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Quiz } from '../../../../models/quiz';
import { QuizListComponent } from '../../../quiz/components/quiz-list/quiz-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-quizzes',
  imports: [QuizListComponent, RouterLink],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.scss'
})
export class ViewQuizzesComponent {
  studentQuizService = inject(StudentService);

  quizzes: Quiz[] = [];

  ngOnInit() {
    this.studentQuizService.getQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes;
    })
  }
}
