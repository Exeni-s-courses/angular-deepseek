import { Component, inject, signal } from '@angular/core';
import {
  ChatMessageComponent,
  DeepMessageOrthographyComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { DeepSeekService } from '@services/deep-seek.service';

@Component({
  selector: 'app-orthography-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    DeepMessageOrthographyComponent,
  ],
  templateUrl: './orthography-page.component.html',
  styles: ``,
})
export default class OrthographyPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public deepSeekService = inject(DeepSeekService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isDeep: false,
        text: prompt,
      },
    ]);
    this.deepSeekService.checkOrthography(prompt).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          {
            isDeep: true,
            text: res.message,
            info: res,
          },
        ]);
      },
    });
  }
}
