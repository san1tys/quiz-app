import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_TOKEN = 'access_token';
  private readonly REFRESH_TOKEN = 'refresh_token';
  private readonly USER = 'user';

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.getUser());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(data: { username: string, password: string, password2: string, role: string }) {
    return this.http.post<{ message: string }>('http://localhost:8000/api/registration/', data).toPromise();
  }

  async login(username: string, password: string) {
    const response = await this.http.post<{ access: string, refresh: string }>('http://localhost:8000/api/token/', {
      username,
      password
    }).toPromise();

    if (response?.access && response?.refresh) {
      this.setTokens(response.access, response.refresh);
      await this.fetchUserInfo(); // Fetch user info after login
    }

    return response;
  }

  private async fetchUserInfo() {
    const token = this.getAccessToken();

    const user = await this.http.get<any>('http://localhost:8000/api/user/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).toPromise();

    localStorage.setItem(this.USER, JSON.stringify(user));
    this.userSubject.next(user);
  }

  setTokens(access: string, refresh: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, access);
    localStorage.setItem(this.REFRESH_TOKEN, refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  refreshAccessToken(): Promise<any> {
    const refresh = localStorage.getItem(this.REFRESH_TOKEN);
    return this.http.post('http://localhost:8000/api/token/refresh/', { refresh }).toPromise();
  }

  getUser(): any {
    const user = localStorage.getItem(this.USER);
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.ACCESS_TOKEN);
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USER);
    this.userSubject.next(null); // Notify subscribers about logout
    this.router.navigate(['/login']);
  }
}
