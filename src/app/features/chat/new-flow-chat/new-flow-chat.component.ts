import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import Angular Material Form Field
import { MatInputModule } from '@angular/material/input'; // Import Angular Material Input
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatSettingsComponent } from '../chat-settings/chat-settings.component';
import { ChatService } from '../../../services/chat.service';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-new-flow-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule
    MatFormFieldModule, // Add Angular Material Form Field
    MatInputModule, // Add Angular Material Input
    ChatInputComponent,
    ChatSettingsComponent,
  ],
  templateUrl: './new-flow-chat.component.html',
  styleUrls: ['./new-flow-chat.component.scss'],
})
export class NewFlowChatComponent implements OnInit {
  fullAnswer = '';
  // apiKey = '';
  apiKey = 'e05ff68818ab4d2a8a28a01662cb8290';

  payload = { responseMode: 'streaming', query: '' }; // Two-way bind query

  constructor(
    private chatService: ChatService, // Use ChatService
    private tokenStorageService: TokenStorageService // Inject TokenStorageService
  ) {}

  ngOnInit(): void {
    // const apiKey = 'e05ff68818ab4d2a8a28a01662cb8290';
    // const payload = { responseMode: 'streaming', query: '怎么评价新西兰？你用少于100字给我答案' };
    // this.startChatStream(payload, apiKey);
  }

  sendQuery(): void {
    if (this.payload.query.trim()) {
      this.fullAnswer = ''; // Clear previous answer
      this.startChatStream(this.payload, this.apiKey);
    } else {
      console.warn('Query is empty!');
    }
  }

  private startChatStream(
    payload: { responseMode: string; query: string },
    apiKey: string
  ): void {
    this.chatService.streamChat(payload, apiKey).subscribe({
      next: (text) => (this.fullAnswer += text),
      error: (err) => console.error('出错：', err),
      complete: () => console.log('回答结束'),
    });
  }
}
