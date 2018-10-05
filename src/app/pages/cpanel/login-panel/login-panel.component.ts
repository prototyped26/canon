import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {

  public loginForm: FormGroup;
  public eamil: string;
  public password: string;
  public message = '';

  constructor(private authService: AuthServiceService, private formbuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formbuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.signInUser(email, password).then(
        () => {
         this.router.navigate(['/cpanel']);
        },
      (error) => {
          if (error.code === 'auth/user-not-found') {
            this.message = error.message;
          } else {
            this.message = '';
          }
          //console.log(error);
      }
    );
  }

}
