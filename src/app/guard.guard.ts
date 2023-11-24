import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private auth : AuthService,private _route : Router){}
canActivate(){
  if(this.auth.isAdmin()){
    return true
  }
  else{
    //this._snackBar.open('Account create successfully. Please login', 'ok', { duration: 3000 });
    window.history.back()
    
    return false
  }

}
}
