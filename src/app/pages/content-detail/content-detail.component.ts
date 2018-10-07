import { UpSertContent } from './../../models/UpSertContent.model';
import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {

  content: UpSertContent = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public sanitizer: DomSanitizer,
    private componentService: ContentService) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.content = await this.componentService.getOneContent(id);
  }

  goBack(): void {
    this.router.navigate(['article']);
  }
}
