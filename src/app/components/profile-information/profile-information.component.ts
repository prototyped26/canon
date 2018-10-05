import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/User.model';
import {AuthServiceService} from '../../services/auth-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  @Input() user: User;
  public formInfo: FormGroup;
  public action = false;
  public successMessage = '';
  public errorMessage = '';
  constructor(private authService: AuthServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formInfo = this.formBuilder.group({
      'name': [this.user.name, Validators.required]
    });
  }
  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.user.name = this.formInfo.get('name').value;
    this.action = true;
    this.authService.updateUserInformation(this.user)
      .then((res) => {
        this.action = false;
        this.successMessage = 'Your informations is already update.';
      })
      .catch((error) => {
        this.action = false;
        this.errorMessage = '' + error;
      });
  }

}
