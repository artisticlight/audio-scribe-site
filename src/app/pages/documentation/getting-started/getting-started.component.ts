import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_CONFIG } from '../../../app.config.constants';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <article>
      <h1 i18n>Getting Started with {{ config.name }}</h1>

      <section>
        <h2 i18n>Installation</h2>
        <p i18n>
          {{ config.name }} is available on the Apple App Store for Mac, iPad, and iPhone.
          Simply search for "{{ config.name }}" or click the download link.
        </p>
      </section>

      <section>
        <h2 i18n>First Steps</h2>
        <ol>
          <li i18n>Open {{ config.name }} on your device</li>
          <li i18n>Grant microphone permissions when prompted</li>
          <li i18n>Tap the record button to start transcribing</li>
          <li i18n>Speak clearly into your device's microphone</li>
          <li i18n>Tap stop when finished to see your transcription</li>
        </ol>
      </section>

      <section>
        <h2 i18n>System Requirements</h2>
        <ul>
          <li i18n>macOS 14.0 or later</li>
          <li i18n>iOS 17.0 or later</li>
          <li i18n>iPadOS 17.0 or later</li>
        </ul>
      </section>
    </article>
  `,
  styles: [`
    article {
      h1 { margin-bottom: 32px; }
      h2 { margin-top: 32px; margin-bottom: 16px; color: var(--sys-primary); }
      section { margin-bottom: 32px; }
      ol, ul { padding-left: 24px; }
      li { margin-bottom: 8px; line-height: 1.6; }
      p { line-height: 1.6; }
    }
  `]
})
export class GettingStartedComponent {
  protected readonly config = APP_CONFIG;
}
