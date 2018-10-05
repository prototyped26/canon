import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public formSign: FormGroup;
  public errorMessage = '';
  public action = false;
  constructor(private authService: AuthServiceService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formSign = this.formBuilder.group({
      'email': ['', [Validators.email, Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.action = true;
    this.errorMessage = '';
    const email = this.formSign.get('email').value;
    const password = this.formSign.get('password').value;

    this.authService.signInUser(email, password).then(
      (res) => {
          // console.log(res);
        this.action = false;
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.errorMessage = error;
        this.action = false;
      }
    );
  }
}
