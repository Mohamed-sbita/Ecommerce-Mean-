import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
 
  user = {
    email: '',
    password: '',
  };
  er: any = '';
r= {
  email: ' ',
  password: ' ',
};
a: any;

  constructor(private _Auth: AuthService, private router: Router) {}
  sginin() {
    return this._Auth.signin(this.user).subscribe((res) => {
      this.er = res;
      this.r = this.er.error;
      this.a = this.er.user;
      console.log(this.a);
      console.log(this.r);

      if (this.a) {
        localStorage.setItem('idUser', this.a._id);
        localStorage.setItem('idRole', this.a.role);
        this.router.navigate(['/home'])
        
      }
    });
  }
  errEmpty(){
    this.r={
      email: ' ',
      password: ' ',
    };
  }

 
  

  ngOnInit(): void {
    
  }
}
