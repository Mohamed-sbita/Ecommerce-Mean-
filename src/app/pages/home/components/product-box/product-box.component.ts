import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: '[app-product-box]',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  constructor(public AuthService : AuthService ) {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
