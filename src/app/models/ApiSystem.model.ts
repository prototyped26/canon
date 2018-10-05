export class ApiSystem {
  // public endPoint = 'http://127.0.0.1:8000/api/';
  public endPoint = 'https://ujc8506.phpnet.org/canon/public/api/';
  // public urlAPI = 'http://127.0.0.1:8000/';
  public urlAPI = 'https://ujc8506.phpnet.org/canon/public/';
  private localToken = '';
  private localRefreshToken = '';
  public _TOKEN_USER = 'TOKEN_USER';
  public _TOKEN_REFRESH_USER = 'TOKEN_REFRESH_USER';
  private _TOKEN_EXIST = false;

  constructor() {

  }

  setTokenExist (val: boolean) {
    this._TOKEN_EXIST = val;
  }

  getTokenExist (): boolean {
    return this._TOKEN_EXIST;
  }
}
