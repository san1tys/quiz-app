import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../../../models/quiz';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-quiz-play',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './quiz-play.component.html',
})
export class QuizPlayComponent  {
    quizService = inject(QuizService);
    quizForm!: FormGroup;
    quizId: string = '';
    showResult = false;
    score = 0;

    quiz : Quiz | null = null;

    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    isSubmitted = false;
    isPassed = false;
    errorMessage: string | null = null;

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.quizId = params['id'];
        this.fetchQuiz();
      });
    }

    fetchQuiz(): void {
      this.quizService.getQuizById(this.quizId).subscribe((quiz) => {
          this.quiz = quiz;
          console.log(quiz);
          this.initializeForm();
      }
      );
    }
  
    initializeForm(): void {
      const formControls: any = {};
      this.quiz?.questions.forEach((question, index) => {
        formControls[`question_${question.id}`] = ['', Validators.required]; 
      });
      this.quizForm = this.fb.group(formControls);
    }

    onSubmit() {
      if (this.quizForm.valid) {
        
        const selectedAnswers: { [key: string]: string } = {};
        this.quiz?.questions.forEach((question) => {
          const answer = this.quizForm.get(`question_${question.id}`)?.value;
          selectedAnswers[question.id] = answer;
        });
        
        this.quizService.submitAnswers(this.quizId, selectedAnswers).subscribe({
          next: (response) => {
            this.isSubmitted = true;
            console.log('Ответы успешно отправлены:', response);
            this.showResult = true;
            this.score = response.score;
            this.isPassed = response.is_passed;
          },
          error: (error) => {
            if (error.status === 400) {
              console.error('You have been already submitted to this quiz.', error);
              this.errorMessage = 'You have been already submitted to this quiz.';
            } else {
              console.error('The unknown error was occured', error);
              this.errorMessage = 'The unknown error was occured. Try later.';
            }
          }
        });
        

        } else {
          console.log("No valid");
        }
    }

}
