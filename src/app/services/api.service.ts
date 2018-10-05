import { Injectable } from '@angular/core';
import {ApiSystem} from '../models/ApiSystem.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public haveToken = false;
  public apiData: ApiSystem = new ApiSystem();
  public presentToken = '';
  public presentTokenRefresh = '';
  constructor(private cookies: CookieService) {
    if (this.cookies.check(this.apiData._TOKEN_USER)) {
      // f
      console.log('Il y a un token ');
      this.getTokenInformation();
      // mettre à jour les données utilisateur
      this.haveToken = true;
      this.apiData.setTokenExist(true);
    } else {
      this.apiData.setTokenExist(false);
    }
  }

  saveTokenInformation(token_type: string, token: string, token_refresh) {
    this.presentToken = token_type + ' ' + token;
    this.presentTokenRefresh = token_refresh
    return new Promise((resolve, reject) => {
      this.cookies.set(this.apiData._TOKEN_USER, token_type + ' ' + token);
      this.cookies.set(this.apiData._TOKEN_REFRESH_USER, token_refresh);
      resolve(true);
    });
  }

  getTokenInformation() {
    this.presentToken = this.cookies.get(this.apiData._TOKEN_USER);
    this.presentTokenRefresh = this.cookies.get(this.apiData._TOKEN_REFRESH_USER);
  }

  destroyInformation() {
    this.cookies.delete('' + this.apiData._TOKEN_USER);
    this.cookies.delete('' + this.apiData._TOKEN_REFRESH_USER);
  }
}
