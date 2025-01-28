import { Component, input } from '@angular/core';

@Component({
  selector: 'app-my-message',
  imports: [],
  templateUrl: './my-message.component.html',
  styles: ``
})
export class MyMessageComponent {
  text = input.required<string>();
}
