import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesService } from '../../core/services/sales.service';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sales',
  imports: [CommonModule, FormsModule],
  templateUrl: './sales.html',
  styleUrl: './sales.scss',
})
export class Sales {
  private readonly salesService = inject(SalesService);
  private readonly productService = inject(ProductService);
  private readonly authService = inject(AuthService);

  readonly sales = this.salesService.sales$;
  readonly products = this.productService.products$;
  readonly totalRevenue = this.salesService.totalRevenue;

  selectedProductId = signal<string>('');
  quantity = signal<number>(1);
  showForm = signal(false);

  isFormValid = computed(() => !!this.selectedProductId() && this.quantity() > 0);

  processSale(): void {
    const productId = this.selectedProductId();
    const qty = this.quantity();
    const salesperson = this.authService.getCurrentUser()?.name || 'Unknown';

    if (this.isFormValid()) {
      this.salesService.processSale(productId, qty, salesperson);
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.selectedProductId.set('');
    this.quantity.set(1);
    this.showForm.set(false);
  }

  toggleForm(): void {
    this.showForm.update(v => !v);
  }
}
