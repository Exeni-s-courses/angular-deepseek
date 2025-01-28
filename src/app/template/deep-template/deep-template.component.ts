import { Component, inject, signal } from '@angular/core';
import {
  TextMessageEvent,
  TextMessageBoxEvent,
  TextMessageBoxComponent,
  ChatMessageComponent,
  MyMessageComponent,
  TypingLoaderComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { DeepSeekService } from '@services/deep-seek.service';

@Component({
  selector: 'app-deep-template',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './deep-template.component.html',
  styles: ``,
})
export class DeepTemplateComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public deepSeekService = inject(DeepSeekService);

  handleMessage(prompt: string) {

  }

  // handleMessageWithFile(event: TextMessageEvent) {
  //   console.log({ event });
  // }

  // handleMessageWithSelect(event: TextMessageBoxEvent) {
  //   console.log(event);
  // }
}
