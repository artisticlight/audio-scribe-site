import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { APP_CONFIG } from '../../app.config.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly config = APP_CONFIG;
  protected readonly hasAppStoreUrl = this.config.appStoreUrl.trim().length > 0;

  features = [
    {
      icon: 'mic',
      title: $localize`Accurate Transcription`,
      description: $localize`Advanced AI-powered speech recognition for accurate voice-to-text conversion.`
    },
    {
      icon: 'speed',
      title: $localize`Real-time Processing`,
      description: $localize`Get instant transcriptions as you speak with minimal latency.`
    },
    {
      icon: 'devices',
      title: $localize`Cross-Platform Sync`,
      description: $localize`Seamlessly sync your transcriptions across Mac, iPad, and iPhone.`
    },
    {
      icon: 'security',
      title: $localize`Privacy First`,
      description: $localize`Your audio never leaves your device. All processing happens locally.`
    },
    {
      icon: 'folder',
      title: $localize`Export Options`,
      description: $localize`Export to multiple formats including TXT, PDF, and DOCX.`
    },
    {
      icon: 'translate',
      title: $localize`Multi-language Support`,
      description: $localize`Support for over 50 languages and dialects.`
    }
  ];
}
