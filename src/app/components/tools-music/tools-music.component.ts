import {Component, Input, OnInit} from '@angular/core';
import {UpSertContent} from '../../models/UpSertContent.model';
import {FileManagerService} from '../../services/file-manager.service';
import {ContentElement} from '../../models/ContentElement.model';
import {ContentService} from '../../services/content.service';

@Component({
  selector: 'app-tools-music',
  templateUrl: './tools-music.component.html',
  styleUrls: ['./tools-music.component.scss']
})
export class ToolsMusicComponent implements OnInit {

  @Input() content: UpSertContent;
  @Input() typeElement: string;
  public contentElement: ContentElement = new ContentElement();
  public importLoad = false;
  public importExternalLoad = false;
  public fileInformation = {
    type: '',
    value: '',
    size: ''
  };
  public linkFIle: string;
  public linkExternale = '';
  constructor(private fileService: FileManagerService, private contentService: ContentService) { }

  ngOnInit() {
  }
  onFileChange(event) {
    this.importLoad = true;
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
          this.linkFIle = res.success.path;
          this.saveElement(this.linkFIle);
          this.importLoad = false;
        })
        .catch((err) => {
          this.importLoad = false;
        });
      console.log(data);
    };
  }

  addExternalFile() {
    if (this.linkExternale !== '') {
      this.importExternalLoad = true;
      this.saveElement( this.linkExternale, this.importExternalLoad);
    }
  }
  saveElement(link: string, extLoad?: boolean) {
    this.contentElement.content = this.content.id;
    this.contentElement.value = link;
    // this.contentElement.type = 'audio';
    this.contentElement.type = this.typeElement;
    this.contentService.addElement(this.contentElement).subscribe((elt: any) => {
      this.content.elements.push(elt.success);
      // console.log(elt);
      if (extLoad !== null ) {
        this.importExternalLoad = false;
      }
    });
  }

}
