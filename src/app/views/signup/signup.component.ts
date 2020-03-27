import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import Constants from '../../constants';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  disableSignupButton: boolean;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null],
      password: [null],
      name: [null]
    });
  }

  async signup(): Promise<void> {
    this.disableSignupButton = true;

    try {
      await this.httpClient.post<void>(environment.linkApi + Constants.NEW_USER_API_ROUTE, this.form.value).toPromise();

      this.snackBar.open(Constants.USER_SUCCESSFULLY_CREATED, '', {
        duration: Constants.SNACK_BAR_DURATION
      });

      this.router.navigate([Constants.LOGIN_ROUTE]);
    } catch (error) {
      const { message } = error?.error;

      this.snackBar.open(message || Constants.UNEXPECTED_ERROR, '', {
        duration: Constants.SNACK_BAR_DURATION
      });
    }

    this.disableSignupButton = false;
  }

  navigateSignup(): void {
    this.router.navigate([Constants.SIGNUP_ROUTE]);
  }
}
