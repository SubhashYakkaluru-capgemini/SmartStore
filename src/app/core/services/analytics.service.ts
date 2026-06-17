import { Injectable, computed, inject } from '@angular/core';
import { SalesService } from './sales.service';
import { ProductService } from './product.service';
import { DashboardMetrics } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly salesService = inject(SalesService);
  private readonly productService = inject(ProductService);

  readonly dashboardMetrics = computed<DashboardMetrics>(() => ({
    totalRevenue: this.salesService.totalRevenue(),
    todayRevenue: this.salesService.todayRevenue(),
    lowStock: this.productService.lowStockCount(),
    activeProducts: this.productService.activeProductCount(),
  }));

  readonly monthlySalesData = computed(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const sales = this.salesService.getSalesByDate(startOfMonth, today);

    // Group by date
    const grouped = new Map<string, number>();
    sales.forEach(sale => {
      const dateStr = new Date(sale.saleDate).toLocaleDateString();
      grouped.set(dateStr, (grouped.get(dateStr) || 0) + sale.totalAmount);
    });

    return Array.from(grouped.entries()).map(([date, amount]) => ({
      date,
      amount,
    }));
  });

  readonly productCategoryStats = computed(() => {
    const products = this.productService.getAllProducts();
    const grouped = new Map<string, { count: number; value: number }>();

    products.forEach(product => {
      const category = product.category;
      const stats = grouped.get(category) || { count: 0, value: 0 };
      stats.count += 1;
      stats.value += product.quantity * product.price;
      grouped.set(category, stats);
    });

    return Array.from(grouped.entries()).map(([category, stats]) => ({
      category,
      ...stats,
    }));
  });

  readonly topSellingProducts = computed(() => {
    const sales = this.salesService.getAllSales();
    const grouped = new Map<string, { name: string; quantity: number; revenue: number }>();

    sales.forEach(sale => {
      const existing = grouped.get(sale.productId) || {
        name: sale.productName,
        quantity: 0,
        revenue: 0,
      };
      existing.quantity += sale.quantity;
      existing.revenue += sale.totalAmount;
      grouped.set(sale.productId, existing);
    });

    return Array.from(grouped.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  });
}
