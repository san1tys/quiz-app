import { Routes } from '@angular/router';
import { LoginComponent } from './user/auth/pages/login/login.component';
import { RegisterComponent } from './user/auth/pages/register/register.component';
import { HomeComponent } from './home/home.component';
import { QuizDetailComponent } from './features/quiz/components/quiz-detail/quiz-detail.component';
import { CreateQuizComponent } from './features/teacher/pages/create-quiz/create-quiz.component';
import { QuizListComponent } from './features/quiz/components/quiz-list/quiz-list.component';

import { authGuard } from './core/auth.guard';
import { DashboardComponent } from './user/auth/pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'create', component: CreateQuizComponent },
    { path: 'quiz/:id', component: QuizDetailComponent },
    { path: 'quiz-list', component: QuizListComponent },
    { path: 'create', component: CreateQuizComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];
