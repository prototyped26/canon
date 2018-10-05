import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../models/User.model';
import {ApiService} from './api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiSystem} from '../models/ApiSystem.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private showHeader = true;
  public showHeaderSubject = new Subject<boolean>();
  public user: User = new User();
  public userSubject = new Subject<User>();
  public apiObject: ApiSystem = new ApiSystem();
  private clientSecret = '52kbWnItyaJQ0sY5ON0OQdJ5pLqPCdLdyeXwDMgd';
  public userToken = '';
  public userTokenType = '';
  private connectionObject: any = {
    grant_type: 'password',
    client_id: '2',
    client_secret: '',
    username: '',
    password: ''
  };
  private connectionRefresObject: any = {
    grant_type: 'refresh_token',
    client_id: '2',
    client_secret: '',
    refresh_token: ''
  };
  public userConnect = false;
  public userConnectSubject = new Subject<boolean>();
  constructor(private apiService: ApiService, private httpClient: HttpClient) {
    this.connectionObject.client_secret = this.clientSecret;
    this.connectionRefresObject.client_secret = this.clientSecret;
  }

  emitStateHeader() {
    this.showHeaderSubject.next(this.showHeader);
  }
  emitUser() {
    this.userSubject.next(this.user);
  }
  emitUserConnect() {
    this.userConnectSubject.next(this.userConnect);
  }
  changerShowingHeader(action: boolean) {
    this.showHeader = action;
    this.emitStateHeader();
  }

  createNewUser(user: User) {
    return new Promise( (resolve, reject) => {
      this.httpClient.post('' + this.apiObject.endPoint + 'register', user,
        { headers: new HttpHeaders({'Content-Type':  'application/json'})}).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
          reject(error.error);
        }
      );
    });
  }

  forgetMyPassword(email: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('' + this.apiObject.endPoint + 'login/password-reset',
        {email: email},
        { headers: new HttpHeaders({'Content-Type':  'application/json'})}).subscribe(
        (res: any) => {
          console.log(res);
          resolve(true);
          // get token after signIn verifaction
        },
        (error) => {
          if (error.status >= 400 && error.status < 500) {
            reject('Error please verify your credential information login !');
          } else {
            reject('Error was occured please try again !');
          }
          // console.log(error.status);
        }
      );
    });
  }

  resetPasswordWithToken(token: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('' + this.apiObject.endPoint + 'login/password-new',
        {token: token},
        { headers: new HttpHeaders({'Content-Type':  'application/json'})}).subscribe(
        (res: any) => {
          console.log(res);
          resolve(true);
          // get token after signIn verifaction
        },
        (error) => {
          if (error.status >= 400 && error.status < 500) {
            reject('Error please verify your credential information login !');
          } else {
            reject('Error was occured please try again !');
          }
          // console.log(error.status);
        }
      );
    });
  }

  validatePasswordWithToken(token: string, password: string, cpassword: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('' + this.apiObject.endPoint + 'login/password-valid',
        {token: token, password: password, c_password: cpassword},
        { headers: new HttpHeaders({'Content-Type':  'application/json'})}).subscribe(
        (res: any) => {
          console.log(res);
          resolve(true);
          // get token after signIn verifaction
        },
        (error) => {
          if (error.status >= 400 && error.status < 500) {
            reject('Error please verify your credential information password !');
          } else {
            reject('Error was occured please try again !');
          }
          // console.log(error.status);
        }
      );
    });
  }
  updateUserInformation(user: User) {
    this.user = user;
    return new Promise((resolve, reject) => {
      this.httpClient.post('' + this.apiService.apiData.endPoint + 'user/edit',
        user,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': '' + this.userTokenType + ' ' + this.userToken
          })
        }
      ).subscribe(
        (res) => {
          console.log(res);
          this.emitUser();
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  signInUser(email: string, password: string) {
    this.connectionObject.username = email;
    this.connectionObject.password = password;
    return new Promise((resolve, reject) => {
      this.httpClient.post('' + this.apiObject.urlAPI + 'oauth/token', this.connectionObject,
        { headers: new HttpHeaders({'Content-Type':  'application/json'})}).subscribe(
        (res: any) => {
          // console.log(res);
          const tokenVal = '' + res.token_type + ' ' + res.access_token;
          this.userToken = res.access_token;
          this.userTokenType = res.token_type;
          // console.log(tokenVal);
          this.apiService.saveTokenInformation(res.token_type, res.access_token, res.refresh_token).then((data) => {
            this.httpClient.get(this.apiObject.endPoint + 'user', {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': '' + res.token_type + ' ' + res.access_token})
            }).subscribe(
              (result: User) => {
                this.userConnect = true;
                this.user = result;
                this.emitUser();
                this.emitUserConnect();
                resolve(true);
              },
              (error1) => {
                reject('Error was occured please try again !');
              }
            );
          }).catch((err) => {
            reject('Error was occured please try again !');
          });
          // get token after signIn verifaction
        },
        (error) => {
          if (error.status >= 400 && error.status < 500) {
            reject('Error please verify your credential information login !');
          } else {
            reject('Error was occured please try again !');
          }
          // console.log(error.status);
        }
      );
    });
  }

  async signInWithRefreshToken(token) {
    this.connectionRefresObject.refresh_token = token;
    const promise = await new Promise(async (resolve, reject) => {
      await this.httpClient.post('' + this.apiObject.urlAPI + 'oauth/token', this.connectionRefresObject,
        { headers: new HttpHeaders({'Content-Type':  'application/json'})}).subscribe(
        (res: any) => {
          // console.log(res);
          const tokenVal = '' + res.token_type + ' ' + res.access_token;
          this.userToken = res.access_token;
          this.userTokenType = res.token_type;
          // console.log(tokenVal);
          this.apiService.saveTokenInformation(res.token_type, res.access_token, res.refresh_token).then((data) => {
            this.httpClient.get(this.apiObject.endPoint + 'user', {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': '' + res.token_type + ' ' + res.access_token})
            }).subscribe(
              (result: User) => {
                this.userConnect = true;
                this.user = result;
                this.emitUser();
                this.emitUserConnect();
                resolve(true);
              },
              (error1) => {
                reject('Error was occured please try again !');
              }
            );
          }).catch((err) => {
            reject('Error was occured please try again !');
          });
          // get token after signIn verifaction
        },
        (error) => {
          if (error.status >= 400 && error.status < 500) {
            reject('Error please verify your credential information login !');
          } else {
            reject('Error was occured please try again !');
          }
          this.apiService.destroyInformation();
          // console.log(error.status);
        }
      );
    });
    return promise;
  }

  signInOutUser() {
    this.user = new User();
    this.userConnect = false;
    this.apiService.destroyInformation();
  }

  setCurrentUser(user: User) {
    this.user = user;
  }

}
