import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherQuizService } from '../../services/teacher-quiz.service';
import { Quiz } from '../../../../models/quiz';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.scss'
})
export class CreateQuizComponent {
  teacherQuizService = inject(TeacherQuizService);
  router = inject(Router);
  submitted = false;

  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    questions: new FormArray<FormGroup<any>>([])
  });


  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }



  addQuestion() {
    const questionForm = new FormGroup({
      text: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      answer_choices: new FormArray<FormGroup<any>>([
        new FormGroup({
          text: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required]
          }),
          is_correct: new FormControl<boolean>(false, {
            nonNullable: true
          })
        })
      ])
    });

    (this.form.get('questions') as FormArray).push(questionForm);
  }


  onCorrectAnswerSelected(questionIndex: number, answerIndex: number) {
    const answers = (this.form.get('questions') as FormArray)
      .at(questionIndex)
      .get('answer_choices') as FormArray;

    answers.controls.forEach((control, idx) => {
      control.get('is_correct')?.setValue(idx === answerIndex);
    });
  }


  addAnswerChoice(questionIndex: number) {
    const questions = this.form.get('questions') as FormArray;
    const answerChoices = questions.at(questionIndex).get('answer_choices') as FormArray;

    answerChoices.push(
      new FormGroup({
        text: new FormControl<string>('', {
          nonNullable: true,
          validators: [Validators.required]
        }),
        is_correct: new FormControl<boolean>(false, { nonNullable: true })
      })
    );
  }

  getAnswerChoicesControls(questionIndex: number): any[] {
    const questions = this.form.get('questions') as FormArray;
    const answerChoices = questions.at(questionIndex).get('answer_choices') as FormArray;
    return answerChoices ? answerChoices.controls : [];
  }

  removeQuestion(i: number) {
    const questions = this.form.get('questions') as FormArray;
    questions.removeAt(i);
  }

  removeAnswer(questionIndex: number, answerIndex: number) {
    const questions = this.form.get('questions') as FormArray;
    const question = questions.at(questionIndex) as FormGroup;
    const answerChoices = question.get('answer_choices') as FormArray;
    answerChoices.removeAt(answerIndex);
  }

  eachQuestionHasAtLeastTwoAnswers(): boolean {
    return this.questions.controls.every((q) => {
      const answers = q.get('answer_choices') as FormArray;
      return answers.length >= 2;
    });
  }

  onSubmit() {
    this.submitted = true;

    if (
      this.form.invalid ||
      this.questions.length === 0 ||
      !this.eachQuestionHasAtLeastTwoAnswers()
    ) {
      this.markFormGroupTouched(this.form);
      return;
    }

    const quiz: Quiz = this.form.value as Quiz;
    this.teacherQuizService.createQuiz(quiz).subscribe({
      next: (createdQuiz) => {
        console.log('Квиз успешно создан:', createdQuiz);
        this.form.reset();
        this.questions.clear();
        this.submitted = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Ошибка при создании квиза:', error);
      }
    });
  }



  hasAtLeastOneQuestion(): boolean {
    const questions = this.form.get('questions') as FormArray;
    return questions.length > 0;
  }

  eachQuestionHasTwoAnswers(): boolean {
    const questions = this.form.get('questions') as FormArray;
    return questions.controls.every((question) => {
      const answers = question.get('answer_choices') as FormArray;
      return answers.length >= 2;
    });
  }


  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
} 
