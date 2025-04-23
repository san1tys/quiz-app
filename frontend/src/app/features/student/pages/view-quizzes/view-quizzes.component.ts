import { Component, inject } from '@angular/core';
import { StdudentService } from '../../services/student.service';
import { Quiz } from '../../../../models/quiz';
import { QuizListComponent } from '../../../quiz/components/quiz-list/quiz-list.component';

@Component({
  selector: 'app-view-quizzes',
  imports: [QuizListComponent],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.scss'
})
export class ViewQuizzesComponent {
  studentQuizService = inject(StdudentService);

  quizzes: Quiz[] = [];

  ngOnInit() {
    this.studentQuizService.getQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes;
    })
  }
}
