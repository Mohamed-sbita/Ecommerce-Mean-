import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  viewp = false;
  viewc = false;
  viewo=false;
  formee = false;
  formeeC = false;
  formeeC1=false
  products: any;
  categories: any;
  orders:any
  product = {
    pName: '',
    pDescription: '',
    pPrice: 0,
    pCategory: '',
    _id: '',
  };
  category={
    cName : '',
    cDescription:'',
    _id:''
  }
  category2={
    cName : '',
    cDescription:''
  }
  cat:any
  imageP: any;
  err: any;
  succ: any;
  ordersSET={
    status:'',
    oid:''
  }
  
 

  constructor(private store: StoreService, private snackBar: MatSnackBar) {}
 

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getOrders()
  }
  viewP() {
    this.viewc = false;
    this.viewp = true;
    this.viewo = false;
  
  }
  viewC() {
    this.viewc = true;
    this.viewp = false;
    this.viewo = false;
    
  }
  viewO() {
    this.viewo=true;
    this.viewc = false;
    this.viewp = false;
   
  }
  getProducts(): void {
    this.store.getallProducts().subscribe((_products) => {
      this.products = _products;
      
    });
  }
  getCategories(): void {
    this.store.getallcategories().subscribe((_categories) => {
      this.categories = _categories;
    });
  }
  addCat(){
    this.store.addCategory(this.category).subscribe((res)=>{
      this.category={
        cName : '',
        cDescription:'',
        _id:''
      };
      this.ngOnInit()

    })
  }
  editeCat(id:any){
    this.formeeC1=true
    this.store.getbyidCat(id).subscribe((res=>{
      this.cat=res
      this.category=this.cat
    }))
    
    
  }
  onselectionchange(status: string,id:string) {
    this.ordersSET.status = status;
    this.ordersSET.oid=id;
    // this.updateOrders()
    // 
    this.store.updateOrders(id,this.ordersSET).subscribe((res)=>{
      console.log(res);
     this.ngOnInit()
    })
    
  }
  
  edit(id:any){
    this.formeeC1=!this.formeeC1
    this.category2.cDescription=this.category.cDescription
    this.category2.cName=this.category.cName
      this.category={
        cName : '',
        cDescription:'',
        _id:''

      }
    this.store.editCategorie(id,this.category2).subscribe((res)=>{
      console.log(res);
      this.ngOnInit()
      
    })
   
   
  }
  deleteCat(id:any){
    this.store.deleteCat(id).subscribe((res)=>{
      console.log(res);
      this.ngOnInit()
      
    })

  }
  
  getOrders(){
    this.store.getallOrders().subscribe((_orders)=>{
      this.orders=_orders;
      console.log(this.orders);
      
    })
  }

  add() {
    let formData = new FormData();
    formData.append('pName', this.product.pName);
    formData.append('pDescription', this.product.pDescription);
    formData.append('pPrice', this.product.pPrice.toString());
    formData.append('pCategory', this.product.pCategory);
    formData.append('pImages', this.imageP);
    this.store.AddProduct(formData).subscribe((res) => {
      console.log(res);
      this.product = {
        pName: '',
        pDescription: '',
        pPrice: 0,
        pCategory: '',
        _id: '',
      };
     
        this.formee=!this.formee;
      this.ngOnInit();
    });
  }
  select(e: any) {
    this.imageP = e.target.files[0];
    console.log(this.imageP);
  

  }
  
  deleteP(id: any) {
    this.store.deleteProduct(id).subscribe((res) => {
      this.succ = res;

      this.snackBar.open(this.succ.success, 'ok', { duration: 3000 });
      this.getProducts()
    });
  }
}
