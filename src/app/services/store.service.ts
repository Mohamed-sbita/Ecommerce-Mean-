import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const STORE_BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  
  getallProducts(category?:string){
    return this.httpClient.get( `${STORE_BASE_URL}/products${category?'/'+category:''}`);

  }
  getPbyid(id:any){
    return this.httpClient.get( `${STORE_BASE_URL}/single-product`+id);

  }
  getallcategories(){
    return this.httpClient.get( `${STORE_BASE_URL}/all-category`);

  }
  addCategory(category:any){
    return this.httpClient.post( `${STORE_BASE_URL}/add-category`,category);
  }
  getbyidCat(id:any){
    return this.httpClient.get(`${STORE_BASE_URL}/single-category/`+id)

  }
  editCategorie( id:any ,category:any ){
    return this.httpClient.put(`${STORE_BASE_URL}/edit-category/`+id,category)

  }
  deleteCat(id:any){
    return this.httpClient.delete(`${STORE_BASE_URL}/delete-category/`+id)

  }
  

  AddProduct(product : FormData){
   return this.httpClient.post(`${STORE_BASE_URL}/add-product`,product)

  }
  deleteProduct(id:any){
    return this.httpClient.delete(`${STORE_BASE_URL}/delete-product/`+id)
  }

  createOrder(order:any){
    return this.httpClient.post(`${STORE_BASE_URL}/create-order`,order)
  }
  getallOrders(){
    return this.httpClient.get(`${STORE_BASE_URL}/get-all-orders`)
  }
  getorderbyiduser(id:any){
    return this.httpClient.get(`${STORE_BASE_URL}/order-by-user/`+id)
  }
  updateOrders(id:any,status:any){
    return this.httpClient.put(`${STORE_BASE_URL}/update-order/`+id,status)
  }
  
}
