import { Component } from '@angular/core';
import {AuthServiceService} from './services/auth-service.service';
import {ApiService} from './services/api.service';
import {ContentService} from './services/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'canon';

  constructor(private authService: AuthServiceService, private apiService: ApiService, private contentService: ContentService) {
    const token = apiService.presentTokenRefresh;
    if (this.apiService.haveToken === true) {
      // this.authService.signInWithRefreshToken(token).then((res) => { console.log('Now Connected !'); });
      this.getConnection(token).then((res) => {
        console.log('Now Connected ! ' + res);
        this.contentService.getMyLikeContents().then((r: any) => {});
      });
    }
  }

  async getConnection(token) {
    return await this.authService.signInWithRefreshToken(token);
  }
}
