import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserUtil } from './user/user-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'streaming';

  constructor(private router: Router) {
  }

  get username() {
    return UserUtil.user;
  }

  goHome() {
    this.router.navigate(['']);
  }

}
