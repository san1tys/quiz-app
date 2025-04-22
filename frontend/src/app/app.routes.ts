import { Routes } from '@angular/router';
import { LoginComponent } from './user/auth/pages/login/login.component';
import { RegisterComponent } from './user/auth/pages/register/register.component';
import { HomeComponent } from './home/home.component';
import { CreateQuizComponent } from './features/teacher/pages/create-quiz/create-quiz.component';
import { DashboardComponent } from './user/auth/pages/dashboard/dashboard.component';
import { authGuard } from './core/auth.guard';
import { TeacherGuard } from './features/teacher/services/teacher.guard';
import { AccessDeniedComponent } from './user/auth/pages/access-denied/access-denied.component';
import { ManageQuizzesComponent } from './features/teacher/pages/manage-quizzes/manage-quizzes.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'teacher/quizzes/create', component: CreateQuizComponent, canActivate: [authGuard, TeacherGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'access-denied', component : AccessDeniedComponent},
    { path: 'teacher/quizzes', component: ManageQuizzesComponent, canActivate: [authGuard, TeacherGuard]}
];
