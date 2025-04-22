import { Component, inject } from '@angular/core';
import { TeacherQuizService } from '../../services/teacher-quiz.service';
import { Quiz } from '../../../../models/quiz';
import { RouterLink } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-manage-quizzes',
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './manage-quizzes.component.html',
  styleUrl: './manage-quizzes.component.scss'
})
export class ManageQuizzesComponent {
  teacherQuizService = inject(TeacherQuizService);

  quizzes: Quiz[] = [];
  faPlus = faPlus

  ngOnInit() {
    this.teacherQuizService.getQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes;
    })
  }
}
