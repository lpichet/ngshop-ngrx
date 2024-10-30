import { Component, inject } from '@angular/core';
import { CartService } from '../products/cart.service';
import { Observable } from 'rxjs';
import { Cart } from '../products/cart';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCart } from '../products/product.feature';

@Component({
  selector: 'ngshop-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  cart$: Observable<Cart>
  store = inject(Store);
  constructor() {
    this.cart$ = this.store.select(selectCart);
   }

   getCartLength(cart: Cart | null): number {
    return cart && cart.items?.length > 0
      ? cart.items.reduce((acc, item) => acc + item.quantity, 0)
      : 0;
   }
}
