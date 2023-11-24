import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  _URL = 'http://localhost:3000/api/';

  signup(user: any) {
    return this.http.post(this._URL + 'signup', user);
  }
  signin(user: any) {
    return this.http.post(this._URL + 'signin', user);
  }

  getIdFromLocal() {
    return localStorage.getItem('idUser');
  }
  getRoleFromLocal() {
    return localStorage.getItem('idRole');
  }
  isloggin() {
    let ok = localStorage.getItem('idUser')!;
    if (ok) {
      return true;
    } else{ return false;}
  }
  isAdmin(){
    let okk = localStorage.getItem('idRole')!;
    if (okk=='1') {
      return true;
    } else{ return false;}

  }
}
