import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
 
  role : boolean | undefined
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  constructor(
    private cartService: CartService,
    public AuthService: AuthService,
    private router : Router
  ) {}

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
  ngOnInit(): void {
   
    this.role=this.AuthService.isAdmin();

  
    
   
  }
  logout() {
    localStorage.removeItem('idUser')
    localStorage.removeItem('idRole')
    this.router.navigate(['/home']);
  }
}
