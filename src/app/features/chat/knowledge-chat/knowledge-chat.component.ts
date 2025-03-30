import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-knowledge-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './knowledge-chat.component.html',
  styleUrls: ['./knowledge-chat.component.scss']
})
export class KnowledgeChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
