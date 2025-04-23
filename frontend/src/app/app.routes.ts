import { Routes } from '@angular/router';
import { LoginComponent } from './user/auth/pages/login/login.component';
import { RegisterComponent } from './user/auth/pages/register/register.component';
import { HomeComponent } from './home/home.component';
import { CreateQuizComponent } from './features/teacher/pages/create-quiz/create-quiz.component';
import { DashboardComponent } from './user/auth/pages/dashboard/dashboard.component';
import { authGuard } from './core/auth.guard';
import { TeacherGuard } from './features/teacher/services/teacher.guard';
import { AccessDeniedComponent } from './user/auth/pages/access-denied/access-denied.component';
import { ManageUsersComponent } from './features/teacher/pages/manage-users/manage-users.component';
import { MyQuizzesComponent } from './features/student/pages/my-quizzes/my-quizzes.component';
import { ViewQuizzesComponent } from './features/student/pages/view-quizzes/view-quizzes.component';
import { QuizPlayComponent } from './features/quiz/components/quiz-play/quiz-play.component';



export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'dashboard/create', component: CreateQuizComponent, canActivate: [authGuard, TeacherGuard] },
    {
        path: 'dashboard', component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'my-quizzes', pathMatch: 'full' },
            { path: 'my-quizzes', component: MyQuizzesComponent },
            { path: 'quizzes', component: ViewQuizzesComponent },
        ],
        canActivate: [authGuard]
    },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: 'dashboard/manage-quizzes', component: ManageUsersComponent, canActivate: [authGuard, TeacherGuard] },
    { path: 'quiz/play/:id', component: QuizPlayComponent },

];
