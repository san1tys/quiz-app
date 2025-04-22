import { Component, inject } from '@angular/core';
import { TeacherQuizService } from '../../services/teacher-quiz.service';
import { Quiz } from '../../../../models/quiz';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-quizzes',
  imports: [RouterLink],
  templateUrl: './manage-quizzes.component.html',
  styleUrl: './manage-quizzes.component.scss'
})
export class ManageQuizzesComponent {
    teacherQuizService = inject(TeacherQuizService);
    
    quizzes : Quiz[] = [];

    ngOnInit() {
      this.teacherQuizService.getQuizzes().subscribe((quizzes) => {
        this.quizzes = quizzes;
      })
    }
}
