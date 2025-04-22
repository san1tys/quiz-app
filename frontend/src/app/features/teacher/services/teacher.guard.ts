import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TeacherGuard implements CanActivate {
  router = inject(Router);

  canActivate(): boolean {
    const userString = localStorage.getItem('user');

    if (!userString) {
      this.router.navigate(['access-denied']);
      return false;
    }

    try {
      const user = JSON.parse(userString);
      if (user && user.role === 'teacher') {
        return true;
      } else {
        this.router.navigate(['access-denied']);
        return false;
      }
    } catch (error) {
      console.error('Ошибка при парсинге данных пользователя из localStorage:', error);
      this.router.navigate(['access-denied']);
      return false;
    }
  }
}