import {ContentElement} from './ContentElement.model';
import {User} from './User.model';

export class UpSertContent {
  public id: number;
  public title: string;
  public desc: string;
  public content: string;
  public category: number;
  public parent: string;
  public author: string;
  public user: User;
  public created_at: string;
  public updated_at: string;
  public cover: string;
  public elements: Array<ContentElement> = [];
  public comment_number: number;
  public like_number: number;
  public follow_number: number;
  public view: number;
  public works:number;
  constructor() {
    this.id = null;
    this.title = '';
    this.desc = '';
    this.content = '';
    this.cover = '';
  }
}
