import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { APP_CONFIG } from './app.config.constants';

const STORAGE_KEY = 'audio-scribe:darkMode';

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
export class App implements OnDestroy {
  protected readonly config = APP_CONFIG;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly tooltipLightMode = $localize`Switch to light mode`;
  protected readonly tooltipDarkMode = $localize`Switch to dark mode`;

  isDarkMode = signal(this.getInitialDarkMode());
  isSidenavOpen = signal(false);

  navigationItems = [
    { label: $localize`Home`, path: '/', icon: 'home' },
    { label: $localize`Documentation`, path: '/documentation', icon: 'description' },
    { label: $localize`Support`, path: '/support', icon: 'support_agent' },
    { label: $localize`About`, path: '/about', icon: 'info' }
  ];

  private mediaQuery: MediaQueryList | null = null;
  private mediaQueryHandler = (e: MediaQueryListEvent) => {
    if (this.getStoredPreference() === null) {
      this.isDarkMode.set(e.matches);
      this.applyDarkMode(e.matches);
    }
  };

  constructor() {
    if (typeof document !== 'undefined') {
      this.applyDarkMode(this.isDarkMode());
    }
    if (typeof window !== 'undefined') {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQuery.addEventListener('change', this.mediaQueryHandler);
    }
  }

  ngOnDestroy(): void {
    this.mediaQuery?.removeEventListener('change', this.mediaQueryHandler);
  }

  toggleDarkMode(): void {
    this.isDarkMode.update(value => !value);
    this.applyDarkMode(this.isDarkMode());
    this.setStoredPreference(String(this.isDarkMode()));
  }

  toggleSidenav(): void {
    this.isSidenavOpen.update(value => !value);
  }

  closeSidenav(): void {
    this.isSidenavOpen.set(false);
  }

  private getInitialDarkMode(): boolean {
    const stored = this.getStoredPreference();
    if (stored !== null) return stored === 'true';
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }

  private getStoredPreference(): string | null {
    if (typeof localStorage === 'undefined') return null;
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  private setStoredPreference(value: string): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch { /* storage unavailable */ }
  }

  private applyDarkMode(isDark: boolean): void {
    document.documentElement.classList.toggle('dark', isDark);
  }
}
