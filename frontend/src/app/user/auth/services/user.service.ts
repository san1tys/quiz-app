import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_KEY = 'loggedInUser';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (email === 'test@example.com' && password === 'password') {
        resolve({ user: { email, name: 'Test User' } });
      } else {
        reject({ error: { message: 'Invalid credentials' } });
      }
    });
  }

  async register(data: { fullname: string, email: string, password: string }): Promise<any> {
    return await this.http.post('/api/users/create-account', data).toPromise();
  }


  setUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}
