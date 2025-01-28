import { Component, inject, signal } from '@angular/core';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { DeepSeekService } from '@services/deep-seek.service';

@Component({
  selector: 'app-pros-cons-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './pros-cons-page.component.html',
  styles: ``,
})
export default class ProsConsPageComponent {
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
    this.deepSeekService.prosConsDiscusser(prompt).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.messages.update((prev) => [
          ...prev,
          {
            isDeep: true,
            text: res.content,
          },
        ]);
      },
    });
  }
}
