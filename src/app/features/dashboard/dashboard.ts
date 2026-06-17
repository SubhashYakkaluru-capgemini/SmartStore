import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly analyticsService = inject(AnalyticsService);

  readonly metrics = this.analyticsService.dashboardMetrics;
  readonly monthlySalesData = this.analyticsService.monthlySalesData;
  readonly topProducts = this.analyticsService.topSellingProducts;

  totalRevenue = computed(() => this.metrics().totalRevenue.toFixed(2));
  todayRevenue = computed(() => this.metrics().todayRevenue.toFixed(2));
  lowStock = computed(() => this.metrics().lowStock);
  activeProducts = computed(() => this.metrics().activeProducts);
}
