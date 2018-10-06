import {ContentElement} from './ContentElement.model';

export class UpSertContent {
  public id: number;
  public title: string;
  public desc: string;
  public content: string;
  public category: number;
  public parent: string;
  public author: string;
  public created_at: string;
  public updated_at: string;
  public cover: string;
  public elements: Array<ContentElement> = [];
  public comments = [];
  public like: number;
  public follow: number;
  public view: number;
  constructor() {
    this.id = null;
    this.title = '';
    this.desc = '';
    this.content = '';
    this.cover = '';
  }
}
