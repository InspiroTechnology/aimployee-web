import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-knowledge-chat',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './knowledge-chat.component.html',
  styleUrls: ['./knowledge-chat.component.scss'],
})
export class KnowledgeChatComponent implements OnInit {
  @Output() messageSent = new EventEmitter<string>();
  message: string = '';

  constructor() {}

  ngOnInit(): void {}

  sendMessage(): void {
    if (this.message.trim()) {
      this.messageSent.emit(this.message); // Emit the message to the parent
      console.log('Message sent:', this.message);
      this.message = ''; // Clear the text area after sending
    }
  }
}
