import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatSettingsComponent } from '../chat-settings/chat-settings.component';
import { ChatService } from '../../../services/chat.service';
import { TokenStorageService } from '../../../core/auth/token-storage.service';
import { UserStateServiceService } from '../../../core/auth/user-state-service.service';

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
    private tokenStorageService: TokenStorageService,// Inject TokenStorageService
    private userStateServiceService: UserStateServiceService 
    //UserStateServiceService
  ) {}

  ngOnInit(): void {
    const apiKey = this.getApiKey();
    const payload = { responseMode: 'streaming', query: '怎么评价新西兰？' };

    this.chatService.streamChat(payload, apiKey).subscribe({
      next: (text) => (this.fullAnswer += text),
      error: (err) => console.error('出错：', err),
      complete: () => console.log('回答结束'),
    });
  }

  //this is a function to get key. currently we only have one key
  getApiKey(): string {
    return this.userStateServiceService.getApiKeys()[0];
  }
}
