import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-documentation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent {
  navItems = [
    { label: $localize`Getting Started`, path: '/documentation/getting-started', icon: 'rocket_launch' },
    { label: $localize`Features`, path: '/documentation/features', icon: 'stars' },
    { label: $localize`FAQ`, path: '/documentation/faq', icon: 'help' }
  ];
}
