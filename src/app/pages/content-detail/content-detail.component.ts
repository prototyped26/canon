import { UpSertContent } from './../../models/UpSertContent.model';
import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {

  content:UpSertContent = null;
  constructor(private route:ActivatedRoute,
    private location:Location,
    private componentService:ContentService) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.content = await this.componentService.getOneContent(id);

    console.log(`Contenu: ${JSON.stringify(this.content)}`);
  }

}
