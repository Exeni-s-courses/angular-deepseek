import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-box',
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box.component.html',
  styles: ``,
})
export class TextMessageBoxComponent {
  public placeholder = input<string>('');
  public disabledCorrections = input<boolean>(false);
  public onMessage = output<string>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
  });

  handleSubmit() {
    if (this.form.invalid) return;

    const { prompt } = this.form.value;
    this.onMessage.emit(prompt ?? '');
    this.form.reset();
  }
}
