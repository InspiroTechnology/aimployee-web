import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatSettingsComponent } from '../chat-settings/chat-settings.component';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-new-flow-chat',
  standalone: true,
  imports: [CommonModule, ChatInputComponent, ChatSettingsComponent],
  templateUrl: './new-flow-chat.component.html',
  styleUrls: ['./new-flow-chat.component.scss'],
})
export class NewFlowChatComponent implements OnInit {
  fullAnswer = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    const apiUrl = 'http://1.14.73.74:8081/app/api/v1/llm/chat/messages'; // 替换成真实地址
    const apiKey = 'e05ff68818ab4d2a8a28a01662cb8290';
    const payload = { responseMode: 'streaming', query: '怎么评价新西兰？' ,
    };

    this.chatService.streamChat(apiUrl, payload, apiKey).subscribe({
      next: (text) => (this.fullAnswer += text),
      error: (err) => console.error('出错：', err),
      complete: () => console.log('回答结束'),
    });
  }
}
