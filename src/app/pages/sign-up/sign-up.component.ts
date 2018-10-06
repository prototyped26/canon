import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../services/auth-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/User.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public user: User = new User();
  public formSign: FormGroup;
  public passwordOk = true;
  public messageError = '';
  public action = false;
  constructor(private router: Router,
              private authService: AuthServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formSign = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      'repassword': ['', [Validators.required]]
    });
  }

  onSubmit() {
      this.action = true;
      this.messageError = '';
      this.passwordMatch();
      this.user.name = this.formSign.get('name').value;
      this.user.email = this.formSign.get('email').value;
      this.user.password = this.formSign.get('password').value;
      this.user.c_password = this.formSign.get('repassword').value;


      if ( this.passwordOk ) {
        // console.log('ok');
        this.authService.createNewUser(this.user)
          .then((data: string) => {
            this.user.id = data;
            this.user.password = null;
            this.action = false;
            this.authService.setCurrentUser(this.user);
            this.router.navigate(['/profile']);
          },
          (error) => {
            console.log(error);
            this.action = false;
            this.messageError = error.error;
          });
      } else {
        this.action = false;
      }
  }

  passwordMatch() {
    const p1: string = this.formSign.get('password').value;
    const p2: string = this.formSign.get('repassword').value;
    if (p1 !== '' && p2 !== '' && ('' + p1.toString() === '' + p2.toString())) {
      this.passwordOk = true;
    } else {
      this.passwordOk = false;
    }

  }

}
