import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_CONFIG } from '../../../app.config.constants';

@Component({
  selector: 'app-features',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article>
      <h1 i18n>Features</h1>

      <section>
        <h2 i18n>Real-time Transcription</h2>
        <p i18n>
          Experience instant speech-to-text conversion as you speak. Our advanced AI
          processes your voice in real-time with minimal latency.
        </p>
      </section>

      <section>
        <h2 i18n>Offline Processing</h2>
        <p i18n>
          All transcription happens locally on your device. Your audio never leaves
          your device, ensuring maximum privacy and security.
        </p>
      </section>

      <section>
        <h2 i18n>Multi-language Support</h2>
        <p i18n>
          {{ config.name }} supports over 50 languages and dialects, including:
        </p>
        <ul>
          <li i18n>English (US, UK, Australian)</li>
          <li i18n>Spanish (Spain, Latin America)</li>
          <li i18n>French</li>
          <li i18n>German</li>
          <li i18n>Italian</li>
          <li i18n>Portuguese</li>
          <li i18n>Japanese</li>
          <li i18n>Korean</li>
          <li i18n>Chinese (Mandarin, Cantonese)</li>
        </ul>
      </section>

      <section>
        <h2 i18n>Export Options</h2>
        <p i18n>
          Export your transcriptions in multiple formats:
        </p>
        <ul>
          <li i18n>Plain Text (.txt)</li>
          <li i18n>PDF Document</li>
          <li i18n>Microsoft Word (.docx)</li>
          <li i18n>Rich Text Format (.rtf)</li>
        </ul>
      </section>

      <section>
        <h2 i18n>iCloud Sync</h2>
        <p i18n>
          Your transcriptions sync seamlessly across all your Apple devices via iCloud.
          Start on your iPhone, continue on your Mac, and access from your iPad.
        </p>
      </section>
    </article>
  `,
  styles: [`
    article {
      h1 { margin-bottom: 32px; }
      h2 { margin-top: 32px; margin-bottom: 16px; color: var(--sys-primary); }
      section { margin-bottom: 32px; }
      ul { padding-left: 24px; }
      li { margin-bottom: 8px; line-height: 1.6; }
      p { line-height: 1.6; }
    }
  `]
})
export class FeaturesComponent {
  protected readonly config = APP_CONFIG;
}
