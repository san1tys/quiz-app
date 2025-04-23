import { AnswerChoice } from "./answer-choice";

export interface Question {
    id: string;
    text: string,
    answer_choices: AnswerChoice[];
    createdAt: Date;
    updatedAt: Date;
}