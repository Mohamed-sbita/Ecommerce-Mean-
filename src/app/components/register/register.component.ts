import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  err: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  r: any;
  succ: any;
  ss: any;
  constructor(private _Auth: AuthService, private router: Router,private _snackBar: MatSnackBar) {}
  sginup() {
    console.log(this.user);
    return this._Auth.signup(this.user).subscribe((res) => {
      console.log(res);
      this.r = res;
      this.err = this.r.error;
      if (!this.err) {
        this._snackBar.open('Account create successfully. Please login', 'ok', { duration: 3000 });
        this.router.navigate(["/login"]);
        console.log(res, 'ok');
        this.succ = res;
        this.ss = this.succ.success;
        this.user = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        };
        
       
      }
    });
  }
  ruturnn() {
    this.err = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
    this.ss =''
  }

  ngOnInit(): void {}
}
