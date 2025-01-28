import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-deep-message-orthography',
  imports: [ProgressBarModule],
  templateUrl: './deep-message-orthography.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeepMessageOrthographyComponent {
  userScore = input.required<number>();
  text = input.required<string>();
  errors = input<string[]>([]);
}
