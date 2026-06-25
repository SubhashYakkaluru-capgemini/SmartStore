import { Component, inject, computed, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../core/services/analytics.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements AfterViewInit {
  private readonly analyticsService = inject(AnalyticsService);

  readonly metrics = this.analyticsService.dashboardMetrics;
  readonly monthlySalesData = this.analyticsService.monthlySalesData;
  readonly topProducts = this.analyticsService.topSellingProducts;
  chart: any;
  totalRevenue = computed(() => this.metrics().totalRevenue.toFixed(2));
  todayRevenue = computed(() => this.metrics().todayRevenue.toFixed(2));
  lowStock = computed(() => this.metrics().lowStock);
  activeProducts = computed(() => this.metrics().activeProducts);

  revenueTrend = computed(() => this.metrics().trends.revenue);
  todayTrend = computed(() => this.metrics().trends.today);
  lowStockTrend = computed(() => this.metrics().trends.lowStock);
  productTrend = computed(() => this.metrics().trends.products);

  // chartjs implimentation in dashboard.html for monthly sales and top products is pending, will be added in next commit.
  constructor() {

  }
  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart() {
    const data = this.monthlySalesData();

    const labels = data.map(d => d.date);
    const values = data.map(d => d.amount);

    this.chart = new Chart('revenueChart', {
      type: 'line', // you can change to 'bar'
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Revenue',
            data: values,
            borderColor: '#4f46e5',
            backgroundColor: 'rgba(79,70,229,0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

}
