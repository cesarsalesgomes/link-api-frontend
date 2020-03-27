import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import Constants from '../../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  disableLoginButton: boolean;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null],
      password: [null]
    });
  }

  async login(): Promise<void> {
    this.disableLoginButton = true;

    try {
      const { token } = await this.httpClient.post<{ token: string }>(environment.linkApi + Constants.LOGIN_ROUTE, this.form.value).toPromise();

      /* Armazena token gerado caso login realizado com sucesso */
      localStorage.setItem(Constants.TOKEN, token);

      this.router.navigate([Constants.VEHICLES_SEARCH_ROUTE]);
    } catch (error) {
      const { message } = error?.error;

      this.snackBar.open(message || Constants.UNEXPECTED_ERROR, '', {
        duration: Constants.SNACK_BAR_DURATION
      });
    }

    this.disableLoginButton = false;
  }
}
