import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../user/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isLoggedIn: boolean = false;
  userInfo: any = null;
  private userSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user) => {
      this.userInfo = user;
      this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
