import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient, HttpHeaders} from '../../../node_modules/@angular/common/http';
import {AuthServiceService} from './auth-service.service';
import {reject} from 'q';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private apiService: ApiService, private httpClient: HttpClient, private authService: AuthServiceService) {
  }

  uploadFileBase64(fileBase64: string, type: string) {
    return new Promise((resolve, reject ) => {
      this.httpClient.post('' + this.apiService.apiData.endPoint + 'file/uplaoad-img-base64',
        {file: fileBase64, format: type},
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': '' + this.authService.userTokenType + ' ' + this.authService.userToken
          })
        }
      ).subscribe(
        (res) => {
          console.log(res);
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}

