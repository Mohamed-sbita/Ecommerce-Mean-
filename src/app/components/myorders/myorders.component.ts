import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {

  constructor(private store : StoreService) { }
  id:any
  orders : any

  ngOnInit(): void {
    this.id=localStorage.getItem('idUser');
    this.getmyorders()

  }

  getmyorders(){
    this.store.getorderbyiduser(this.id).subscribe((res)=>{
      this.orders=res
    })
  }


}
