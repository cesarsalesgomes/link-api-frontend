import { Injectable } from '@angular/core';
import {
  Router, CanActivate
} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Constants from '../constants';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private snackBar: MatSnackBar) { }

  canActivate(): boolean {
    if (this.isAuthenticated()) {
      return true;
    }

    this.snackBar.open(Constants.AUTHENTICATION_REQUIRED, '', {
      duration: Constants.SNACK_BAR_DURATION
    });

    this.router.navigate([Constants.LOGIN_ROUTE]);

    return false;
  }

  private isAuthenticated(): boolean {
    const token = localStorage.getItem(Constants.TOKEN);

    if (!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    /* Checa token expirado */
    return payload.exp > Date.now() / 1000;
  }
}
