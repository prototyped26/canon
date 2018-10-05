import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public formSign: FormGroup;
  public errorMessage = '';
  public successMessage = '';
  public action = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthServiceService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formSign = this.formBuilder.group({
      'email': ['', [Validators.email, Validators.required]]
    });
  }

  onSubmit() {
    const email = this.formSign.get('email').value;
    this.errorMessage = '';
    this.successMessage = '';

    this.action = true;
    this.authService.forgetMyPassword(email).then(
      (res) => {
        this.successMessage = 'If the email you specified exists in our system, we\'ve sent a password reset link to it.';
        this.action = false;
      }
    ).catch((err) => {
      this.errorMessage = '' + err;
      this.action = false;
    });
  }

}
