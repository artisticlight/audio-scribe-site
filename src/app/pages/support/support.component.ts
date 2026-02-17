import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { APP_CONFIG } from '../../app.config.constants';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent {
  protected readonly config = APP_CONFIG;

  supportOptions = [
    {
      icon: 'email',
      title: $localize`Email Support`,
      description: $localize`Send us an email and we'll respond within 24 hours.`,
      action: this.config.supportEmail,
      actionType: 'email'
    },
    {
      icon: 'bug_report',
      title: $localize`Report a Bug`,
      description: $localize`Found an issue? Let us know so we can fix it.`,
      action: this.config.bugsEmail,
      actionType: 'email'
    },
    {
      icon: 'feedback',
      title: $localize`Feature Request`,
      description: $localize`Have an idea to improve ${this.config.name}? We'd love to hear it.`,
      action: this.config.featuresEmail,
      actionType: 'email'
    }
  ];

  faqs = [
    {
      question: $localize`How do I grant microphone permissions?`,
      answer: $localize`Go to Settings > Privacy & Security > Microphone on your device and ensure Audio Scribe is enabled.`
    },
    {
      question: $localize`Why isn't my transcription syncing?`,
      answer: $localize`Make sure you're signed into iCloud and have a stable internet connection. Check that iCloud Drive is enabled for Audio Scribe.`
    },
    {
      question: $localize`How do I delete a transcription?`,
      answer: $localize`Swipe left on the transcription in the list view and tap Delete, or open the transcription and tap the trash icon.`
    }
  ];
}
