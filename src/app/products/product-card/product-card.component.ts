import { Component, Input, inject } from '@angular/core';
import { Product } from '../product.model';
import { CommonModule, DecimalPipe, getCurrencySymbol } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../product.actions';

@Component({
  selector: 'ngshop-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor() { }
  private store = inject(Store);
  currencySymbol(): string {
    return getCurrencySymbol('EUR','narrow');
  }

  buttonCartClicked() {
    this.store.dispatch(ProductsActions.addProductToCart({product: this.product}));
  }

  getRatingClasses(rating: number, index: number) {
    return {
      styles_starIcon: rating >= index,
      styles_emptyStarIcon: rating < index
    }
  }
}
