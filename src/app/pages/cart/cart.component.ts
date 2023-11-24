import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
[x: string]: any;
  chekLogin: boolean | undefined;
  cart: Cart = { items: [] };
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource: CartItem[] = [];
  
  cartSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
    
    
      
    });
    this.chekLogin = this.auth.isloggin();
   
    
    
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
  f() {
   this.onCheckout();
    this.createOrder();
  }
  onCheckout(): void {
    this.http
      .post('http://localhost:3000/api/checkout', {
        items: this.getTotal(this.cart.items),
      })
      .subscribe(async (result: any) => {
        window.open(result.result.link, '_self');
        
      });
  }
  createOrder(){
    
    let allProduct : any[]=[];
    let amount =this.getTotal(this.cart.items)
    let user = localStorage.getItem('idUser')
    let transactionId = this.generat();
    for (let item of this.dataSource) {
      allProduct.push( {id:item.id,qu:item.quantity} )
    }
    let order={
      allProduct,
      amount,
      user,
      transactionId
    }

    this.store.createOrder(order).subscribe((res)=>{
      console.log(allProduct);
      
    })
    
    
    

  }
  generat() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 9; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
