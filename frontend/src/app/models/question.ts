import { AnswerChoice } from "./answer-choice";

export interface Question {
    id: string;
    answer_choices: AnswerChoice[];
    correctAnswer: string;
    createdAt: Date;
    updatedAt: Date;
}