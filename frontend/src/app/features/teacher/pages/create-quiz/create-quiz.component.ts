import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherQuizService } from '../../services/teacher-quiz.service';
import { Quiz } from '../../../../models/quiz';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.scss'
})
export class CreateQuizComponent {
  teacherQuizService = inject(TeacherQuizService);

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

  onSubmit() {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      console.log('Форма некорректна');
      return;
    }

    const quiz: Quiz = this.form.value as Quiz;
    console.log('Форма квиза:', quiz);
    this.teacherQuizService.createQuiz(quiz).subscribe({
      next: (createdQuiz) => {
        console.log('Квиз успешно создан:', createdQuiz);
        this.form.reset();
      },
      error: (error) => {
        console.error('Ошибка при создании квиза:', error);
      }
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
