import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../core/auth/token-storage.service'; // Import TokenStorageService
import { ApiService } from '../core/api/api.service'; // Import ApiService

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private tokenStorageService: TokenStorageService, // Inject TokenStorageService
    private apiService: ApiService // Inject ApiService
  ) {}

  streamChat(payload: any, apiKey: string): Observable<string> {
    const apiUrl = 'api/v1/llm/chat/messages'; // Define apiUrl here
    return new Observable<string>((observer) => {
      const token = this.tokenStorageService.getToken(); // Retrieve token dynamically

      this.apiService
        .post(apiUrl, payload, {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
            token: token || '', // Use the retrieved token or an empty string
          },
        })
        .subscribe({
          next: (response: any) => {
            const reader = response.body?.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            const processStream = async () => {
              while (true) {
                const { done, value } = await reader!.read();
                if (done) {
                  observer.complete();
                  break;
                }

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
                        observer.next(json.answer); // 一段段推送回答
                      }
                    }
                  } catch (err) {
                    console.warn('无法解析：', line);
                  }
                }

                buffer = '';
              }
            };

            processStream().catch((error) => observer.error(error));
          },
          error: (error) => observer.error(error),
        });
    });
  }
}
