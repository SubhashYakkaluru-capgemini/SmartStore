import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutService } from '../../../core/services/layout-service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly layoutService = inject(LayoutService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly notificationService = inject(NotificationService);

  readonly currentUser = this.authService.user$;
  readonly unreadCount = this.notificationService.unreadCount;
  showNotifications = false;

  toggleCollapse(): void {
    this.layoutService.toggleSidebar();
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markAsRead(id: string): void {
    this.notificationService.markAsRead(id);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
