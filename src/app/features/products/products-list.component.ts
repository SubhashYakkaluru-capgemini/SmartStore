import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsFacade } from '../../store/products/facade';
import { Observable } from 'rxjs';
import { Product } from '../../store/products/models';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  products$!: Observable<Product[]>;
  loading$!: Observable<boolean>;

  constructor(private facade: ProductsFacade) {}

  ngOnInit(): void {
    this.products$ = this.facade.products$;
    this.loading$ = this.facade.loading$;
    this.facade.loadProducts();
  }

  select(p: Product) {
    this.facade.selectProduct(p.id);
  }
}
