import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-all-quizzes',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './all-quizzes.component.html',
  styleUrl: './all-quizzes.component.scss'
})
export class AllQuizzesComponent {

}
