export interface QuizScore {
    user: number | string;
    quiz: number;
    score: number;
    is_passed: boolean;
    submitted_at: string;
    answers: { [key: string]: string };
}
