import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../products/product.actions';

@Component({
  selector: 'ngshop-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private store = inject(Store);

  selectCategory(category: string | null) {
    this.store.dispatch(ProductsActions.selectCategory({category}));
  }
}
