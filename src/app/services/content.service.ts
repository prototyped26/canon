import { Injectable } from '@angular/core';
import {AuthServiceService} from './auth-service.service';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/Category.model';
import {Observable, of, Subject} from 'rxjs';
import {HttpHeaders} from '../../../node_modules/@angular/common/http';
import {UpSertContent} from '../models/UpSertContent.model';
import {Like} from '../models/Like.model';
import {Follow} from '../models/Follow.model';
import {LikedFollowedContent} from '../models/LikedFollowedContent.model';
import {catchError, map, tap} from 'rxjs/operators';
import {errorHandler} from '../../../node_modules/@angular/platform-browser/src/browser';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private categories: Array<Category> = [];
  private contents: Array<UpSertContent> = [];
  public categoriesSubject = new Subject<Array<Category>>();
  public contentsSubject = new Subject<Array<UpSertContent>>();
  private likedContents: Array<LikedFollowedContent> = [];
  public  likedContentsSubject = new Subject<Array<LikedFollowedContent>>();
  private followedContents: Array<LikedFollowedContent> = [];
  public  followedContentsSubject = new Subject<Array<LikedFollowedContent>>();
  constructor(private authSerice: AuthServiceService, private httpClient: HttpClient) { }
  emitCategories() {
    this.categoriesSubject.next(this.categories);
  }
  emitContents() {
    this.contentsSubject.next(this.contents);
  }
  emitFollowedContents() {
    this.followedContentsSubject.next(this.followedContents);
  }
  emitLikedContents() {
    this.likedContentsSubject.next(this.likedContents);
  }
  getCategories() {
    return new Promise((resolve, reject) => {
      this.httpClient.get(
        this.authSerice.apiObject.endPoint + 'content/categories',
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': '' + this.authSerice.userTokenType + ' ' + this.authSerice.userToken
          })
        }
      ).subscribe(
        (res: any) => {
          this.categories = res.success;
          this.emitCategories();
          resolve(true);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  upSertContent(content: UpSertContent) {
    content.author = this.authSerice.user.id;
    return new Promise((resolve, reject) => {
      this.httpClient.post(
        this.authSerice.apiObject.endPoint + 'content/upsert',
        content,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': '' + this.authSerice.userTokenType + ' ' + this.authSerice.userToken
          })
        }
      ).subscribe(
        (res: any) => {
          // this.categories = res.success;
          // console.log(res);
          // console.log(res.success);
          resolve(res.success);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getAllContents() {
    this.contents = [];
    return new Promise((resolve, reject) => {
      this.httpClient.get(
        this.authSerice.apiObject.endPoint + 'content/all',
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': '' + this.authSerice.userTokenType + ' ' + this.authSerice.userToken
          })
        }
      ).subscribe(
        (res: any) => {
          // this.categories = res.success;
          // console.log(res);
          this.contents = res.success;
          this.emitContents();
          console.log(res.success);
          resolve(true);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getMyContents() {
    this.contents = [];
    return new Promise((resolve, reject) => {
      this.httpClient.get(
        this.authSerice.apiObject.endPoint + 'content/my/' + this.authSerice.user.id,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': '' + this.authSerice.userTokenType + ' ' + this.authSerice.userToken
          })
        }
      ).subscribe(
        (res: any) => {
          // this.categories = res.success;
          console.log(res);
          this.contents = res.success;
          this.emitContents();
          console.log(res.success);
          resolve(true);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  myContents(): Observable<UpSertContent[]> {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': '' + this.authSerice.userTokenType + ' ' + this.authSerice.userToken
    });
    return this.httpClient.get<UpSertContent[]>(
      this.authSerice.apiObject.endPoint + 'content/my/' + this.authSerice.user.id,
      {headers: head}).pipe(
        tap( (contents: any) => {
          console.log(contents);
          this.contents = contents.success;
          this.emitContents();
        }),
        catchError(this.handleError<UpSertContent[]>('myContents', []))
    );
  }
  getOneContent(id: string): Promise<UpSertContent> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(
        this.authSerice.apiObject.endPoint + 'content/one/' + id,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': '' + this.authSerice.userTokenType + ' ' + this.authSerice.userToken
          })
        }
      ).subscribe(
        async (res: any) => {
          // this.categories = res.success;
          // console.log(res);
          await resolve(res.success);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  onLikeContent(like: Like) {
    like.user = this.authSerice.user.id;
    if (like.id === 'null') {
      like.id = null;
    }
    // console.log(like);
    return new Promise((resolve, reject) => {
      if (this.authSerice.user === null || this.authSerice.user.id === '') {
        reject(false);
      } else {
        this.httpClient.post(
          this.authSerice.apiObject.endPoint + 'content/like',
          like,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': '' + this.authSerice.userTokenType + ' ' + this.authSerice.userToken
            })
          }
        ).subscribe(
          (res: any) => {
            // this.categories = res.success;
            // console.log(res);
            resolve(res.success);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
  onFollowContent(follow: Follow) {
    follow.follower = this.authSerice.user.id;
    if (follow.id === 'null') {
      follow.id = null;
    }
    return new Promise((resolve, reject) => {
      if (this.authSerice.user === null || this.authSerice.user.id === '') {
        reject(false);
      } else {
        this.httpClient.post(
          this.authSerice.apiObject.endPoint + 'content/follow',
          follow,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': '' + this.authSerice.userTokenType + ' ' + this.authSerice.userToken
            })
          }
        ).subscribe(
          (res: any) => {
            // this.categories = res.success;
            // console.log(res);
            resolve(res.success);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
  getMyFollowContents() {
    return new Promise((resolve, reject) => {
      if (this.authSerice.user === null || this.authSerice.user.id === '') {
        reject(false);
      } else {
        this.httpClient.get(
          this.authSerice.apiObject.endPoint + 'content/my/follow/' + this.authSerice.user.id,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': '' + this.authSerice.userTokenType + ' ' + this.authSerice.userToken
            })
          }
        ).subscribe(
          (res: any) => {
            // this.categories = res.success;
            // console.log(res);
            this.followedContents = res.success;
            this.emitFollowedContents();
            resolve(true);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
  getMyLikeContents() {
    return new Promise((resolve, reject) => {
      if (this.authSerice.user === null || this.authSerice.user.id === '') {
        reject(false);
      } else {
        this.httpClient.get(
          this.authSerice.apiObject.endPoint + 'content/my/like/' + this.authSerice.user.id,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': '' + this.authSerice.userTokenType + ' ' + this.authSerice.userToken
            })
          }
        ).subscribe(
          (res: any) => {
            // this.categories = res.success;
            // console.log(res);
            this.likedContents = res.success;
            this.emitLikedContents();
            resolve(true);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
