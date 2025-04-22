import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
