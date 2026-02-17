import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APP_CONFIG } from '../../app.config.constants';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <article class="container section">
      <h1 i18n>About {{ config.name }}</h1>

      <section class="intro">
        <p i18n>
          {{ config.name }} is a professional voice transcription application designed
          exclusively for Apple devices. Our mission is to make voice-to-text
          conversion accessible, accurate, and private.
        </p>
      </section>

      <section class="mission">
        <h2 i18n>Our Mission</h2>
        <p i18n>
          We believe that voice transcription should be simple, accurate, and
          respect your privacy. That's why we built {{ config.name }} to process
          everything locally on your device, ensuring your audio never leaves
          your control.
        </p>
      </section>

      <section class="values">
        <h2 i18n>Our Values</h2>
        <div class="value-grid">
          <div class="value-item">
            <mat-icon>lock</mat-icon>
            <h3 i18n>Privacy First</h3>
            <p i18n>Your audio stays on your device. Period.</p>
          </div>
          <div class="value-item">
            <mat-icon>speed</mat-icon>
            <h3 i18n>Performance</h3>
            <p i18n>Lightning-fast transcription with minimal latency.</p>
          </div>
          <div class="value-item">
            <mat-icon>favorite</mat-icon>
            <h3 i18n>User Focused</h3>
            <p i18n>Designed with real users in mind.</p>
          </div>
          <div class="value-item">
            <mat-icon>star</mat-icon>
            <h3 i18n>Quality</h3>
            <p i18n>High accuracy across 50+ languages.</p>
          </div>
        </div>
      </section>

      <section class="cta">
        <h2 i18n>Ready to Try {{ config.name }}?</h2>
        @if (hasAppStoreUrl) {
          <p i18n>Download now from the App Store.</p>
          <a
            mat-raised-button
            color="primary"
            [href]="config.appStoreUrl"
            target="_blank"
            rel="noopener noreferrer">
            <mat-icon>download</mat-icon>
            <span i18n>Download on App Store</span>
          </a>
        } @else {
          <p i18n>The App Store listing is coming soon. Join the launch list for updates.</p>
          <a mat-raised-button color="primary" [href]="config.launchUpdatesUrl">
            <mat-icon>email</mat-icon>
            <span i18n>Notify Me</span>
          </a>
        }
      </section>
    </article>
  `,
  styles: [`
    article {
      max-width: 800px;
      margin: 0 auto;

      h1 { margin-bottom: 24px; }
      h2 { margin-top: 48px; margin-bottom: 16px; color: var(--sys-primary); }

      .intro p {
        font-size: 1.25rem;
        line-height: 1.6;
        color: var(--sys-on-surface-variant);
      }

      .mission p {
        line-height: 1.6;
      }

      .value-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
        margin-top: 24px;

        @media (min-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .value-item {
        text-align: center;
        padding: 24px;
        background: var(--sys-surface-variant);
        border-radius: 16px;

        mat-icon {
          font-size: 40px;
          width: 40px;
          height: 40px;
          color: var(--sys-primary);
          margin-bottom: 16px;
        }

        h3 {
          margin-bottom: 8px;
        }

        p {
          color: var(--sys-on-surface-variant);
          margin: 0;
        }
      }

      .cta {
        text-align: center;
        margin-top: 64px;
        padding: 48px;
        background: var(--sys-surface-variant);
        border-radius: 16px;

        h2 {
          margin-top: 0;
          margin-bottom: 8px;
          color: var(--sys-on-surface);
        }

        p {
          color: var(--sys-on-surface-variant);
          margin-bottom: 24px;
        }

        [mat-raised-button] {
          mat-icon {
            margin-right: 8px;
          }
        }
      }
    }
  `]
})
export class AboutComponent {
  protected readonly config = APP_CONFIG;
  protected readonly hasAppStoreUrl = this.config.appStoreUrl.trim().length > 0;
}
