import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthServiceService} from '../../../services/auth-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/User.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public errorMessage = '';
  public successMessage = '';
  public formSign: FormGroup;
  private token = '';
  private user: User = new User();
  public action = false;
  public hideZone = false;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthServiceService,
              private formBuilder: FormBuilder) {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  ngOnInit() {
    this.authService.resetPasswordWithToken(this.token).then((res) => { })
      .catch((err) => {
        this.router.navigate(['/']);
      });
    this.initiFOrm();
  }

  initiFOrm() {
    this.formSign = this.formBuilder.group({
      'password': ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      'repassword': ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.action = true;
    this.user.password = this.formSign.get('password').value;
    this.user.c_password = this.formSign.get('repassword').value;

    this.authService.validatePasswordWithToken(this.token, this.user.password, this.user.c_password).then(
      (res) => {
        this.successMessage = 'Your password are reset please do to Sign In an connect !';
        this.action = false;
        this.hideZone = true;
      }
    ).catch(
      (err) => {
        this.errorMessage = '' + err;
        this.action = false;
      }
    );
  }

}
