import { Component, HostListener, OnInit, signal } from '@angular/core';
 import { Sidebar } from "./shared/components/sidebar/sidebar";
import { Main } from './main/main';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('SmartStore'); 
}
