import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UpSertContent} from '../../models/UpSertContent.model';
import {Category} from '../../models/Category.model';
import {User} from '../../models/User.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContentService} from '../../services/content.service';
import {FileManagerService} from '../../services/file-manager.service';
import {AuthServiceService} from '../../services/auth-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  public coverContentLoad = false;
  public apiKey = 'qrmdenr4rqmgn9w1zd9ksklo7dotz0sbh5uwvox820jj20pn';
  public categories: Array<Category> = [];
  public categoriesSubscription: Subscription;
  public currentContent: UpSertContent = new UpSertContent();
  public errorMessage = '';
  public successMessage = '';
  public formContent: FormGroup;
  public contentString = '';
  public formction = false;
  public fileInformation = {
    type: '',
    value: '',
    size: ''
  };
  public userSubscription: Subscription;
  constructor(private formBuilder: FormBuilder, private contentService: ContentService, private route: ActivatedRoute,
              private fileService: FileManagerService, private authService: AuthServiceService, private router: Router) {
    this.currentContent.content = '';
    const id = this.route.snapshot.paramMap.get('id');
    this.userSubscription = this.authService.userSubject.subscribe(async (u: User) => {
      if (u.id !== null && u.id !== '') {
        if (id !== null) {
          await this.getCOntent(id);
        }
      }
    });
    this.categoriesSubscription = this.contentService.categoriesSubject.subscribe((c: any) => {
      this.categories = c;
    });
    this.contentService.getCategories().then((res: any) => { console.log(res); });
    console.log( id );
  }

  ngOnInit() {
    this.initForm();
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
  }
  initForm() {
    this.formContent = this.formBuilder.group({
      'title': [this.currentContent.title, Validators.required],
      'desc': [this.currentContent.desc, Validators.required],
      'category': [this.currentContent.category, Validators.required],
    });
  }
  async getCOntent(id) {
    await this.contentService.getOneContent(id).then(
      (res: UpSertContent) => {
        this.currentContent = res;
        console.log(res);
        this.contentString = this.currentContent.content;
        this.initForm();
      });
  }
  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.formction = true;
    this.currentContent.title = this.formContent.get('title').value;
    this.currentContent.desc = this.formContent.get('desc').value;
    this.currentContent.category = this.formContent.get('category').value;
    this.contentService.upSertContent(this.currentContent).then(
      (res: UpSertContent) => {
        this.successMessage = (this.currentContent.id !== null ? 'Updating' : 'Creating') + ' content successfully !';
        this.formction = false;
        console.log(res);
        this.router.navigate(['/content/', '' + res.id]);
      },
      (err) => {
        this.formction = false;
        this.errorMessage = 'Error : ' + err;
      }
    );
  }
  onFileChange(event) {
    this.coverContentLoad = true;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const data = reader.result.split(',');
      const typeInfo = data[0].split('/')[1].split(';');
      this.fileInformation.value = data[1];
      this.fileInformation.type = typeInfo[0];
      this.fileService.uploadFileBase64(reader.result, this.fileInformation.type)
        .then((res: any) => {
          this.currentContent.cover = res.success.path;
          this.coverContentLoad = false;
        })
        .catch((err) => {
          this.coverContentLoad = false;
        });
      console.log(data);
    };
  }

  initContent() {
    this.currentContent = new UpSertContent();
  }
}
