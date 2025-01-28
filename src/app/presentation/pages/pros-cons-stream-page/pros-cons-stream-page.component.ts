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
  selector: 'app-pros-cons-stream-page',
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './pros-cons-stream-page.component.html',
  styles: ``,
})
export default class ProsConsStreamPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public abortSignal = new AbortController();

  public deepSeekService = inject(DeepSeekService);

  async handleMessage(prompt: string) {
    this.abortSignal.abort();
    this.abortSignal = new AbortController();
    this.messages.update((prev) => [
      ...prev,
      { isDeep: false, text: prompt },
      { isDeep: true, text: '...' },
    ]);

    this.isLoading.set(true);
    const stream = this.deepSeekService.prosConsDiscusserStream(
      prompt,
      this.abortSignal.signal
    );

    this.isLoading.set(false);
    for await (const text of stream) {
      this.handleStreamResponse(text);
    }
  }

  handleStreamResponse(message: string) {
    this.messages().pop();

    const messages = this.messages();
    this.messages.set([...messages, { isDeep: true, text: message }]);
  }
}
