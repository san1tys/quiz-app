import { Component, ViewRef } from '@angular/core';
import { ManageQuizzesComponent } from '../../../../features/teacher/pages/manage-quizzes/manage-quizzes.component';
import { ViewQuizzesComponent } from '../../../../features/student/pages/view-quizzes/view-quizzes.component';

@Component({
  selector: 'app-dashboard',
  imports: [ManageQuizzesComponent, ViewQuizzesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userString = localStorage.getItem('user');
  user = JSON.parse(this.userString!);
  role = this.user.role;
}