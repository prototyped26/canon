import {Component, OnDestroy, OnInit} from '@angular/core';
import {UpSertContent} from '../../models/UpSertContent.model';
import {Subscription} from 'rxjs';
import {ContentService} from '../../services/content.service';

@Component({
  selector: 'app-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit, OnDestroy {

  public contents: Array<UpSertContent> = [];
  public noContent = false;
  public loadContent = true;
  public contentsSubscription: Subscription;
  constructor(private contentService: ContentService) {
  }

  ngOnInit() {
    this.contentsSubscription = this.contentService.contentsSubject.subscribe(
      (c: Array<UpSertContent>) => {
        this.contents = c;
        console.log(c.length);
      });
    this.contentService.getAllContents().then((res: any) => {
      if (this.contents.length === 0) {
        this.noContent = true;
      }
      this.loadContent = false;
    });
  }
  ngOnDestroy() {
    this.contentsSubscription.unsubscribe();
  }

}
