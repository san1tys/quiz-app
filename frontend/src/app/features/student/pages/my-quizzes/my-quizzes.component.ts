import { Component, inject } from '@angular/core';
import { Quiz } from '../../../../models/quiz';
import { StudentService } from '../../services/student.service';
import { QuizListComponent } from "../../../quiz/components/quiz-list/quiz-list.component";

@Component({
  selector: 'app-my-quizzes',
  imports: [QuizListComponent],
  templateUrl: './my-quizzes.component.html',
  styleUrl: './my-quizzes.component.scss'
})
export class MyQuizzesComponent {
  studentQuizService = inject(StudentService);

  quizzes: Quiz[] = [];

  ngOnInit() {
    this.studentQuizService.getEnrolledQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes;
    })
  }
}
