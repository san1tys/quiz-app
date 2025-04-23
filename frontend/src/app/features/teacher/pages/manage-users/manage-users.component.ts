import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherQuizService } from '../../services/teacher-quiz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  imports: [CommonModule],
})
export class ManageUsersComponent implements OnInit {
  quizId!: number;
  quizScores: any[] = [];
  totalParticipants: number = 0;

  constructor(
    private route: ActivatedRoute,
    private quizService: TeacherQuizService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.quizId = +params['quizId'];
      this.fetchScores();
    });
  }

  fetchScores(): void {
    this.quizService.getQuizScores(this.quizId).subscribe({
      next: (data) => {
        this.quizScores = data;
        this.totalParticipants = data.length || 0;
      },
      error: (err) => {
        console.error('Failed to fetch quiz scores', err);
      }
    });
  }
}
