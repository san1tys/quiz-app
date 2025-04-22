import { Routes } from '@angular/router';
import { LoginComponent } from './user/auth/pages/login/login.component';
import { RegisterComponent } from './user/auth/pages/register/register.component';
import { HomeComponent } from './home/home.component';
import { CreateQuizComponent } from './features/teacher/pages/create-quiz/create-quiz.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'create', component: CreateQuizComponent },
];
