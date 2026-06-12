import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../shared/components/header/header';
import { LayoutService } from '../core/services/layout-service';
import { Sidebar } from "../shared/components/sidebar/sidebar";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Header, Sidebar],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  layoutService = inject(LayoutService);
  sizeClass = computed(() => {
    return this.layoutService.isSidebarCollapsed()
      ? ''
      : window.innerWidth > 768
        ? 'body-trimmed'
        : 'body-md-screen';
  });
}