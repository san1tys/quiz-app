import { Component, inject, OnInit } from '@angular/core';
import { TeacherQuizService } from '../../services/teacher-quiz.service';
import { Quiz } from '../../../../models/quiz';
import { RouterLink } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuizListComponent } from '../../../quiz/components/quiz-list/quiz-list.component';

@Component({
  selector: 'app-manage-quizzes',
  standalone: true,
  imports: [
    RouterLink,
    FontAwesomeModule,
    QuizListComponent,
  ],
  templateUrl: './manage-quizzes.component.html',
  styleUrls: ['./manage-quizzes.component.scss']
})
export class ManageQuizzesComponent implements OnInit {
  teacherQuizService = inject(TeacherQuizService);
  quizzes: Quiz[] = [];
  faPlus = faPlus;

  ngOnInit() {
    this.teacherQuizService.getQuizzes().subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }
}
