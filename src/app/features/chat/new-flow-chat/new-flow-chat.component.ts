import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatSettingsComponent } from '../chat-settings/chat-settings.component';
import { ChatService } from '../../../services/chat.service';
import { ApiService } from '../../../core/api/api.service';
import { TokenStorageService } from '../../../core/auth/token-storage.service';

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
    private chatService: ChatService,
    private apiService: ApiService, // Inject ApiService
    private tokenStorageService: TokenStorageService // Inject TokenStorageService
  ) {}

  ngOnInit(): void {
    const apiUrl = 'api/v1/llm/chat/messages'; // Use relative endpoint
    const apiKey = 'e05ff68818ab4d2a8a28a01662cb8290';
    const payload = { responseMode: 'streaming', query: '怎么评价新西兰？' };

    const token = this.tokenStorageService.getToken(); // Retrieve token dynamically

    this.apiService
      .post(apiUrl, payload, {
        headers: {
          'X-API-Key': apiKey,
          token: token || '', // Include token in headers
        },
      })
      .subscribe({
        next: (text) => (this.fullAnswer += text),
        error: (err) => console.error('出错：', err),
        complete: () => console.log('回答结束'),
      });
  }
}
