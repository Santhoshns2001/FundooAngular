import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

import { SideNavComponent } from '../side-nav/side-nav.component';
import { TopNavComponent } from '../top-nav/top-nav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    SideNavComponent,
    TopNavComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  expanded = true; // Google Keep default

  toggleSidenav() {
    this.expanded = !this.expanded;
  }
}
