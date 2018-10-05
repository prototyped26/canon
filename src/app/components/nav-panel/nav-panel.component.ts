import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent implements OnInit {

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit() {
  }

  onLogOut() {
    this.authService.signInOutUser();
    this.router.navigate(['/cpanel', 'login']);
  }

}
