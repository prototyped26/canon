import {Component, Input, OnInit} from '@angular/core';
import {UpSertContent} from '../../models/UpSertContent.model';
import {ContentElement} from '../../models/ContentElement.model';
import {ContentService} from '../../services/content.service';
import {el} from '../../../../node_modules/@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-tools-text',
  templateUrl: './tools-text.component.html',
  styleUrls: ['./tools-text.component.scss']
})
export class ToolsTextComponent implements OnInit {

  @Input() content: UpSertContent;
  @Input() textToEdit: string;
  @Input() id: string;
  public apiKey = 'qrmdenr4rqmgn9w1zd9ksklo7dotz0sbh5uwvox820jj20pn';
  public menu = {
    // file: {title: 'File', items: 'newdocument'},
    edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
    insert: {title: 'Insert', items: 'link media | template hr'},
    view: {title: 'View', items: 'visualaid'},
    format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
    table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
    tools: {title: 'Tools', items: 'spellchecker code'}
  };
  public contentString = '';
  public loadText = false;
  public contentElement: ContentElement = new ContentElement();
  constructor(private contentService: ContentService) { }

  ngOnInit() {
    if (this.textToEdit !== '') {
      this.contentString = this.textToEdit;
      this.contentElement.id = (this.id === null ? null : this.id);
      this.textToEdit = '';
      this.id = null;
    }
  }

  saveElement() {
    this.loadText = true;
    this.contentElement.content = this.content.id;
    this.contentElement.value = this.contentString;
    // this.contentElement.type = 'audio';
    this.contentElement.type = 'text';
    this.contentService.addElement(this.contentElement).subscribe((elt: any) => {
      if (this.contentElement.id !== null) {
        this.content.elements.forEach(( element ) => {
          if ( element.id === this.contentElement.id) {
            element.value = this.contentElement.value;
          }
        });
      } else {
        this.content.elements.push(elt.success);
      }
      // console.log(elt);
      this.contentString = '';
      this.id = null;
      this.loadText = false;
    });
  }

}
