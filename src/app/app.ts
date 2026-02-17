import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { APP_CONFIG } from './app.config.constants';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly config = APP_CONFIG;
  protected readonly currentYear = new Date().getFullYear();

  isDarkMode = signal(
    localStorage.getItem('darkMode') === 'true' ||
    (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  isSidenavOpen = signal(false);

  navigationItems = [
    { label: $localize`Home`, path: '/', icon: 'home' },
    { label: $localize`Documentation`, path: '/documentation', icon: 'description' },
    { label: $localize`Support`, path: '/support', icon: 'support_agent' },
    { label: $localize`About`, path: '/about', icon: 'info' }
  ];

  constructor() {
    document.documentElement.classList.toggle('dark', this.isDarkMode());
  }

  toggleDarkMode(): void {
    this.isDarkMode.update(value => !value);
    document.documentElement.classList.toggle('dark', this.isDarkMode());
    localStorage.setItem('darkMode', String(this.isDarkMode()));
  }

  toggleSidenav(): void {
    this.isSidenavOpen.update(value => !value);
  }

  closeSidenav(): void {
    this.isSidenavOpen.set(false);
  }
}
