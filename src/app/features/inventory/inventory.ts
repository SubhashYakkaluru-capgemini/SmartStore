import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory {
  private readonly productService = inject(ProductService);
  private readonly authService = inject(AuthService);

  readonly products = this.productService.products$;
  readonly lowStockProducts = this.productService.lowStockProducts;
  readonly totalValue = this.productService.totalInventoryValue;

  showForm = signal(false);
  editingId = signal<string | null>(null);
  formData = signal({
    name: '',
    sku: '',
    price: 0,
    quantity: 0,
    reorderLevel: 0,
    category: '',
  });

  reorderProductId = signal<string | null>(null);
  reorderQuantity = signal(0);

  isFormValid = computed(() => {
    const f = this.formData();
    return (
      f.name.trim().length > 0 &&
      f.sku.trim().length > 0 &&
      f.category.trim().length > 0 &&
      Number(f.price) > 0 &&
      Number(f.quantity) >= 0 &&
      Number(f.reorderLevel) >= 0
    );
  });

  isAdmin = computed(() => this.authService.isAdmin());

  saveProduct(): void {
    if (!this.isFormValid()) return;

    const data = this.formData();
    if (this.editingId()) {
      this.productService.updateProduct(this.editingId()!, {
        name: data.name,
        sku: data.sku,
        price: data.price,
        quantity: data.quantity,
        reorderLevel: data.reorderLevel,
        category: data.category,
      } as any);
    } else {
      this.productService.addProduct({
        name: data.name,
        sku: data.sku,
        price: data.price,
        quantity: data.quantity,
        reorderLevel: data.reorderLevel,
        category: data.category,
      } as any);
    }

    this.resetForm();
  }

  editProduct(id: string): void {
    const product = this.productService.getProduct(id);
    if (!product) return;

    this.formData.set({
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity,
      reorderLevel: product.reorderLevel,
      category: product.category,
    });
    this.editingId.set(id);
    this.showForm.set(true);
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
    }
  }

  openReorderForm(id: string): void {
    this.reorderProductId.set(id);
    this.reorderQuantity.set(0);
  }

  reorderProduct(): void {
    const id = this.reorderProductId();
    const qty = this.reorderQuantity();

    if (id && qty > 0) {
      this.productService.reorderProduct(id, qty);
      this.reorderProductId.set(null);
      this.reorderQuantity.set(0);
    }
  }

  toggleForm(): void {
    this.showForm.update(v => !v);
    if (!this.showForm()) {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.formData.set({
      name: '',
      sku: '',
      price: 0,
      quantity: 0,
      reorderLevel: 0,
      category: '',
    });
    this.editingId.set(null);
    this.showForm.set(false);
  }
}
