export class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public c_password: string;
  public role: number;
  public rol_string: string;
  public email_verified_at: string;
  public cover = '';
  public img = '';
  constructor() {
    this.role = 1;
    this.id = '';
  }

}
