import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_CONFIG } from '../../app.config.constants';

@Component({
  selector: 'app-privacy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <article class="container section">
      <h1 i18n>Privacy Policy</h1>
      <p class="last-updated" i18n>Last updated: January 2026</p>

      <section>
        <h2 i18n>Introduction</h2>
        <p i18n>
          {{ config.name }} ("we", "our", or "us") is committed to protecting your privacy.
          This Privacy Policy explains how we handle your information when you use our
          voice transcription application.
        </p>
      </section>

      <section>
        <h2 i18n>Data Processing</h2>
        <p i18n>
          All voice transcription processing occurs entirely on your device. Your audio
          recordings and transcriptions are never transmitted to our servers or any
          third-party services.
        </p>
      </section>

      <section>
        <h2 i18n>Information We Collect</h2>
        <p i18n>We do not collect personal information. Specifically:</p>
        <ul>
          <li i18n>Voice recordings stay on your device</li>
          <li i18n>Transcriptions are stored locally and optionally in your iCloud</li>
          <li i18n>We do not collect usage analytics</li>
          <li i18n>We do not use cookies or tracking technologies</li>
        </ul>
      </section>

      <section>
        <h2 i18n>iCloud Data</h2>
        <p i18n>
          If you enable iCloud sync, your transcriptions are stored in your personal
          iCloud account. This data is encrypted and managed by Apple according to
          their privacy policies. We do not have access to your iCloud data.
        </p>
      </section>

      <section>
        <h2 i18n>Third-Party Services</h2>
        <p i18n>
          {{ config.name }} does not integrate with any third-party analytics, advertising,
          or data collection services. The app functions entirely offline.
        </p>
      </section>

      <section>
        <h2 i18n>Children's Privacy</h2>
        <p i18n>
          Our app is suitable for all ages. Since we do not collect any personal
          information, our services are safe for children to use.
        </p>
      </section>

      <section>
        <h2 i18n>Changes to This Policy</h2>
        <p i18n>
          We may update this Privacy Policy from time to time. We will notify you of
          any changes by posting the new Privacy Policy on this page and updating the
          "Last updated" date.
        </p>
      </section>

      <section>
        <h2 i18n>Contact Us</h2>
        <p i18n>
          If you have questions about this Privacy Policy, please contact us at:
        </p>
        <p>
          <a [href]="'mailto:' + config.privacyEmail">{{ config.privacyEmail }}</a>
        </p>
      </section>
    </article>
  `,
  styles: [`
    article {
      max-width: 800px;
      margin: 0 auto;

      h1 { margin-bottom: 8px; }
      .last-updated { color: var(--sys-on-surface-variant); margin-bottom: 32px; }
      h2 { margin-top: 32px; margin-bottom: 16px; color: var(--sys-primary); }
      section { margin-bottom: 32px; }
      ul { padding-left: 24px; }
      li { margin-bottom: 8px; line-height: 1.6; }
      p { line-height: 1.6; }
    }
  `]
})
export class PrivacyComponent {
  protected readonly config = APP_CONFIG;
}
