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
  constructor() {
    this.id = null;
    this.title = '';
    this.desc = '';
    this.content = '';
    this.cover = '';
  }
}
