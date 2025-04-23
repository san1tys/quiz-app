import { Component, ViewRef } from '@angular/core';
import { ManageQuizzesComponent } from '../../../../features/teacher/pages/manage-quizzes/manage-quizzes.component';
import { ViewQuizzesComponent } from '../../../../features/student/pages/view-quizzes/view-quizzes.component';
import { RouterOutlet } from '@angular/router';
import { AllQuizzesComponent } from "../../../../features/student/pages/all-quizzes/all-quizzes.component";

@Component({
  selector: 'app-dashboard',
  imports: [ManageQuizzesComponent, ViewQuizzesComponent, RouterOutlet, AllQuizzesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userString = localStorage.getItem('user');
  user = JSON.parse(this.userString!);
  role = this.user.role;
}