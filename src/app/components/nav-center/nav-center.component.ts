import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../services/auth-service.service';
import {User} from '../../models/User.model';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-nav-center',
  templateUrl: './nav-center.component.html',
  styleUrls: ['./nav-center.component.scss']
})
export class NavCenterComponent implements OnInit {

  public hasUser = false;
  public user: User = new User();
  public userSubscription: Subscription;
  public userConnectSubscription: Subscription;
  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit() {
    this.hasUser = this.authService.userConnect;
   this.userSubscription = this.authService.userSubject.subscribe((u: User) => { this.user = u; });
   this.authService.emitUser();
   this.userConnectSubscription = this.authService.userConnectSubject.subscribe((t: boolean) => { this.hasUser = t; });
  }

  onSignOut() {
    this.authService.signInOutUser();
    this.hasUser = false;
    this.router.navigate(['/']);
  }

}
