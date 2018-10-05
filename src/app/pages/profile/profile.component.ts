import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/User.model';
import {AuthServiceService} from '../../services/auth-service.service';
import {FileManagerService} from '../../services/file-manager.service';
import {Subscription} from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Category} from '../../models/Category.model';
import {ContentService} from '../../services/content.service';
import {UpSertContent} from '../../models/UpSertContent.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  closeResult: string;
  public listMenu: Array<string> = ['Article', 'Document', 'Film', 'Profile'];
  public arrayVerificationFile = ['jpeg', 'jpg', 'png', 'bmp'];
  public profilePath = 'https://vignette.wikia.nocookie.net/bungostraydogs/images/1/1e/Profile-icon-9.png';
  public coverFilePath = '';
  public categories: Array<Category> = [];
  public categoriesSubscription: Subscription;
  public currentIndexMenu = 0;
  public currentMenu = '';
  public user: User = new User();
  public userSubcription: Subscription;
  public fileInformation = {
    type: '',
    value: '',
    size: ''
  };
  public imgProfileLoad = false;
  public coverProfileLoad = false;
  public createContent = false;
  public noContent = false;
  public loadContent = false;
  public contents: Array<UpSertContent> = [];
  public contentSubscription: Subscription;
  constructor(private authService: AuthServiceService, private fileService: FileManagerService,
              private modalService: NgbModal, private contentService: ContentService) {
    this.currentMenu = this.listMenu[this.currentIndexMenu];
    console.log(this.contents);
    // this.user = this.authService.user;
    this.loadContent = true;
    this.userSubcription = this.authService.userSubject.subscribe((u: User) => {
      this.user = u;
      this.coverFilePath = u.cover;
      this.profilePath = u.img;
      // console.log(u);
      if (u.id !== null && u.id !== '') {
        this.contentService.getCategories().then(res => {});
        this.contentService.myContents().subscribe(conts => { this.loadContent = false; });
      }
    });
    this.contentSubscription = this.contentService.contentsSubject.subscribe((l: Array<UpSertContent>) => {
      this.contents = l;
      if (l.length === 0) {
        this.noContent = true;
      }
    });
    // this.authService.emitUser();
    this.categoriesSubscription = contentService.categoriesSubject.subscribe((data: Array<Category>) => {
      this.categories = data;
      // console.log(data);
    });
    this.contentService.getMyFollowContents().then((r: any) => {});
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
    this.contentSubscription.unsubscribe();
    this.userSubcription.unsubscribe();
  }

  changeMenu(menu: string) {
    const index = this.listMenu.findIndex(x => x === menu);

    if (index !== null && index !== -1) {
      this.currentIndexMenu = index;
      this.currentMenu = this.listMenu[this.currentIndexMenu];
    }
  }

  onFileChange(event, type: string) {
    console.log(type);
    if (event.target.files && event.target.files.length > 0) {
      if (type === 'profile') {
        this.imgProfileLoad = true;
      } else {
        this.coverProfileLoad = true;
      }

      const file = event.target.files[0];
      this.uploadingFiles(file, type);
    }
  }
  onFileChange2(event, type: string) {
    console.log(type);
    if (event.target.files && event.target.files.length > 0) {
      if (type === 'profile') {
        this.imgProfileLoad = true;
      } else {
        this.coverProfileLoad = true;
      }

      const file = event.target.files[0];
      this.uploadingFiles(file, type);
    }
  }
  uploadingFiles(file: any, type: string) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data = reader.result.split(',');
      const typeInfo = data[0].split('/')[1].split(';');
      this.fileInformation.value = data[1];
      this.fileInformation.type = typeInfo[0];
      this.fileService.uploadFileBase64(reader.result, this.fileInformation.type)
        .then((res: any) => {
          if (type === 'profile') {
            // this.profilePath = res.success.path;
            this.user.img = res.success.path;
            this.authService.updateUserInformation(this.user)
              .then((resData) => {
                this.imgProfileLoad = false;
              })
              .catch((error) => {
                this.imgProfileLoad = false;
              });
          } else {
            // this.coverFilePath = res.success.path;
            this.user.cover = res.success.path;
            this.coverProfileLoad = false;
            this.authService.updateUserInformation(this.user)
              .then((resData) => {
                this.imgProfileLoad = false;
              })
              .catch((error) => {
                this.imgProfileLoad = false;
              });
          }
        })
        .catch((err) => {
          if (type === 'profile') {
            this.imgProfileLoad = false;
          } else {
            this.coverProfileLoad = false;
          }
        });
      console.log(data);
    };
  }
  clearInformation() {
    this.fileInformation = {
      type: '',
      value: '',
      size: ''
    };
  }
  openModal(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title', centered: false,
      size: 'lg'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  closeCreateContent() {
    this.createContent = false;
  }
  openCreateContent() {
    this.createContent = true;
  }

}
