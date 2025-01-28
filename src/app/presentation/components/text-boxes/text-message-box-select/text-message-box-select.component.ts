import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface Option {
  id: string;
  text: string;
}

export interface TextMessageBoxEvent {
  propmt: string;
  selectedOption: string;
}

@Component({
  selector: 'app-text-message-box-select',
  imports: [ReactiveFormsModule],
  templateUrl: './text-message-box-select.component.html',
  styles: ``
})
export class TextMessageBoxSelectComponent {
  public placeholder = input<string>('');
  public options = input.required<Option[]>();

  public onMessage = output<TextMessageBoxEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
    selectedOption: ['', Validators.required],
  });

  handleSubmit() {
    if (this.form.invalid) return;

    const { prompt, selectedOption } = this.form.value;
    this.onMessage.emit({ propmt: prompt!, selectedOption: selectedOption!});
    this.form.reset();
  }
}
