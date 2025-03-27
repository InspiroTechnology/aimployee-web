import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatSettingsComponent } from '../chat-settings/chat-settings.component';
import { ChatService } from '../../../services/chat.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-new-flow-chat',
  standalone: true,
  imports: [CommonModule, ChatInputComponent, ChatSettingsComponent],
  templateUrl: './new-flow-chat.component.html',
  styleUrls: ['./new-flow-chat.component.scss'],
})
export class NewFlowChatComponent implements OnInit {
  fullAnswer = '';

  constructor(
    private chatService: ChatService, // Use ChatService
    private tokenStorageService: TokenStorageService // Inject TokenStorageService
  ) {}

  ngOnInit(): void {
    const apiKey = 'e05ff68818ab4d2a8a28a01662cb8290';
    const payload = { responseMode: 'streaming', query: '怎么评价新西兰？你用少于100字给我答案' };
  
    this.startChatStream(payload, apiKey);
  }

  private startChatStream(payload: { responseMode: string; query: string }, apiKey: string): void {
    this.chatService.streamChat(payload, apiKey).subscribe({
      next: (text) => (this.fullAnswer += text),
      error: (err) => console.error('出错：', err),
      complete: () => console.log('回答结束'),
    });
  }
}
