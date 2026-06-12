import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../../core/services/layout-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  layoutService = inject(LayoutService);
  isCollapsed = computed(() => this.layoutService.isSidebarCollapsed());
  items = [
    {
      routeLink: 'dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard',
    },
    {
      routeLink: 'inventory',
      icon: 'fal fa-boxes',
      label: 'Inventory',
    },
    {
      routeLink: 'sales',
      icon: 'fal fa-shopping-cart',
      label: 'Sales',
    },
    {
      routeLink: 'employees',
      icon: 'fal fa-users',
      label: 'Employees',
    }
  ];
  toggleCollapse() {
    this.layoutService.toggleSidebar();
  }
}
