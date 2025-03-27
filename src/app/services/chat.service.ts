import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public conversationId: string | null = null; // Add a property to store conversation_id

  constructor(
    private tokenStorageService: TokenStorageService, // Inject TokenStorageService
    private apiService: ApiService // Inject ApiService
  ) {}

  streamChat(payload: any, apiKey: string): Observable<string> {
    //apiService.baseUrl
    console.log(this.apiService.baseUrl);
    const apiUrl = this.apiService.baseUrl + 'api/v1/llm/chat/messages'; // Define apiUrl here

    // if (this.conversationId) {
    //   payload.conversation_id = this.conversationId; // Include conversationId if it exists
    // }

    return new Observable<string>((observer) => {
      const token = this.tokenStorageService.getToken(); // Retrieve token dynamically

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
          token: token || '',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder('utf-8');
          let buffer = '';

          const processStream = async () => {
            while (true) {
              const { done, value } = await reader!.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer
                .split('\n')
                .filter((line) => line.trim() !== '');

              for (const line of lines) {
                try {
                  if (line.startsWith('data:')) {
                    const cleanedLine = line.replace(/^data:\s*/, '');
                    const json = JSON.parse(cleanedLine);

                    if (json.event === 'message' && json.answer) {
                      // Save conversation_id if present
                      if (json.conversation_id) {
                        this.conversationId = json.conversation_id;
                      }
                      observer.next(json.answer);
                    } else if (json.event === 'message_end' && json.metadata) {
                      console.log('消息结束，元数据:', json.metadata);
                      observer.complete();
                    }
                  }
                } catch (err) {
                  console.warn('解析失败:', line);
                }
              }

              buffer = '';
            }
          };

          processStream();
        })
        .catch((err) => {
          console.error('fetch 错误:', err);
        });
    });
  }

  getConversationId(): string | null {
    return this.conversationId; // Add a method to retrieve the conversation_id
  }
}
