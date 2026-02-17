import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { APP_CONFIG } from '../../../app.config.constants';

@Component({
  selector: 'app-faq',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatExpansionModule],
  template: `
    <article>
      <h1 i18n>Frequently Asked Questions</h1>

      <mat-accordion>
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title i18n>Is my audio data sent to the cloud?</mat-panel-title>
          </mat-expansion-panel-header>
          <p i18n>
            No. All transcription processing happens locally on your device. Your audio
            never leaves your device, ensuring complete privacy.
          </p>
        </mat-expansion-panel>

        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title i18n>Which languages are supported?</mat-panel-title>
          </mat-expansion-panel-header>
          <p i18n>
            {{ config.name }} supports over 50 languages including English, Spanish, French,
            German, Italian, Portuguese, Japanese, Korean, and Chinese. Check the Features
            section for the complete list.
          </p>
        </mat-expansion-panel>

        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title i18n>Do I need an internet connection?</mat-panel-title>
          </mat-expansion-panel-header>
          <p i18n>
            No internet connection is required for transcription. The app works entirely
            offline. You only need internet for iCloud sync and initial app download.
          </p>
        </mat-expansion-panel>

        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title i18n>How do I export my transcriptions?</mat-panel-title>
          </mat-expansion-panel-header>
          <p i18n>
            Tap the share button on any transcription to export it as TXT, PDF, DOCX,
            or RTF format. You can also copy the text directly to your clipboard.
          </p>
        </mat-expansion-panel>

        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title i18n>Is there a subscription fee?</mat-panel-title>
          </mat-expansion-panel-header>
          <p i18n>
            {{ config.name }} is a one-time purchase with no subscription required. All future
            updates are included with your purchase.
          </p>
        </mat-expansion-panel>
      </mat-accordion>
    </article>
  `,
  styles: [`
    article {
      h1 { margin-bottom: 32px; }
      mat-accordion { margin-top: 24px; }
      mat-expansion-panel { margin-bottom: 8px; }
      p { line-height: 1.6; margin: 0; }
    }
  `]
})
export class FaqComponent {
  protected readonly config = APP_CONFIG;
}
