import { UpSertContent } from './../../models/UpSertContent.model';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ContentService} from '../../services/content.service';
import {Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Like} from '../../models/Like.model';
import {Follow} from '../../models/Follow.model';
import {LikedFollowedContent} from '../../models/LikedFollowedContent.model';
import {AuthServiceService} from '../../services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-grid-content',
  templateUrl: './grid-content.component.html',
  styleUrls: ['./grid-content.component.scss']
})
export class GridContentComponent implements OnInit, OnDestroy {

  @Input() commentLine: boolean;
  @Input() isEditing: boolean;
  public presentComment = false;
  public listContent: Array<UpSertContent>;
  public contentsSubcription: Subscription;
  public randomArray = ['span__1', 'span__2', 'span__2', 'span__1'];
  public tableIndex = [];
  public modalInformationText = '';
  public loaderModal = false;
  public messageErrorModal = '';
  public messageSuccessModal = '';
  public followedContents: Array<LikedFollowedContent> = [];
  public likedContents: Array<LikedFollowedContent> = [];
  public followedSubscription: Subscription;
  public likedSubscription: Subscription;
  constructor(private contentService: ContentService, private modalService: NgbModal,
              private authService: AuthServiceService) {}

  ngOnInit() {
    if (this.commentLine === true) {
      this.presentComment = true;
    }
    this.contentsSubcription = this.contentService.contentsSubject.subscribe((e: Array<UpSertContent>) => {
      this.listContent = e;
      if (typeof  this.listContent !== 'undefined') {
        console.log('Trouvé !');
        const max = this.listContent.length;
        for (let i = 0; i < max; i++) {
          this.tableIndex.push( this.randomArray[Math.floor( Math.random() * this.randomArray.length )] );
        }
      }
    });

    this.followedSubscription = this.contentService.followedContentsSubject.subscribe(
      (f: Array<LikedFollowedContent>) => { this.followedContents = f; }
    );
    this.likedSubscription = this.contentService.likedContentsSubject.subscribe(
      (f: Array<LikedFollowedContent>) => { this.likedContents = f; }
    );
  }
  ngOnDestroy() {
    // this.contentsSubcription.unsubscribe();
    this.followedSubscription.unsubscribe();
    this.likedSubscription.unsubscribe();
  }
  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'red-modal'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  likeContent(content, c: UpSertContent, id: number, opm: boolean) {
    const like: Like = new Like();
    like.content = '' + c.id;
    like.id = '' + id;
    this.messageErrorModal = '';
    this.messageSuccessModal = '';
    this.loaderModal = true;
    this.modalInformationText = 'Like Content of ' + c.author;
    if (opm === true) {
      this.openModal(content);
    }
    this.contentService.onLikeContent(like)
      .then((res: any) => {
        this.contentService.getMyLikeContents().then((r: any) => {});
        this.loaderModal = false;
        this.messageSuccessModal = 'You just loved the content of ' + c.author;
      })
      .catch(err => {
        this.loaderModal = false;
        this.messageErrorModal = 'account';
      });
  }
  followContent(content, c: UpSertContent, id: number, opm: boolean) {
    const follow: Follow = new Follow();
    follow.content = '' + c.id;
    follow.id = '' + id;
    this.messageErrorModal = '';
    this.messageSuccessModal = '';
    this.loaderModal = true;
    this.modalInformationText = 'Follow Content of ' + c.author;
    if (opm === true) {
      this.openModal(content);
    }

    this.contentService.onFollowContent(follow)
      .then((res: any) => {
        this.contentService.getMyFollowContents().then((r: any) => {});
        this.loaderModal = false;
        this.messageSuccessModal = 'You just followed the content of ' + c.author;
      })
      .catch(err => {
        this.loaderModal = false;
        this.messageErrorModal = 'account';
      });
  }
  isLiked(c: UpSertContent) {
    let r = false;
    const exist = this.likedContents.find(l => l.user + '' === '' + this.authService.user.id && l.content === c.id);
    if (typeof  exist !== 'undefined') {
      r = true;
    }
    return r;
  }
  isFollowed(c: UpSertContent) {
    let r = false;
    const exist = this.followedContents.find(l => l.user + '' === '' + this.authService.user.id && l.content === c.id);
    if (typeof  exist !== 'undefined') {
      r = true;
    }
    return r;
  }
  currentLike(c: UpSertContent) {
    const r = this.likedContents.find(l => l.user + '' === '' + this.authService.user.id && l.content === c.id);
    return r.id;
  }
  currentFollow(c: UpSertContent) {
    const r = this.followedContents.find(l => l.user + '' === '' + this.authService.user.id && l.content === c.id);
    return r.id;
  }

}
