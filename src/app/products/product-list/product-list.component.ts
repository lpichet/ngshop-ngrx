import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Observable, combineLatest, map } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../product.actions';
import { selectFilteredProducts, selectProducts } from '../product.feature';

@Component({
  selector: 'ngshop-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private readonly store = inject(Store);
  private route = inject(ActivatedRoute);
  params = this.route.params;
  // products$ = this.store.select('products');
  products$: Observable<Product[]> = new Observable<Product[]>();

  // filteredProducts$ = combineLatest([this.products$, this.params]).pipe(
  //   map(([products, params]) => {
  //     const category = params['category'] ?? '';
  //     return category !== ''
  //     ? products.filter(p => p.category === category)
  //     : products;
  //   })
  // )

  ngOnInit() {
    console.log('ProductListComponent.ngOnInit', this.store);
    this.store.dispatch(ProductsActions.loadProducts());
    this.products$ = this.store.select(selectFilteredProducts);
  }
}
