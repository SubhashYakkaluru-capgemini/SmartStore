import { Component, inject, input, output } from '@angular/core';
import { LayoutService } from '../../../core/services/layout-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  layoutService = inject(LayoutService);
  router = inject(Router);
  toggleCollapse(): void {
    this.layoutService.toggleSidebar();
  }
  logout() { 
    this.router.navigate(['/login']);
  }
}
