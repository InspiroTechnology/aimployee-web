import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../core/auth/token-storage.service'; // Import TokenStorageService

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private tokenStorageService: TokenStorageService) {} // Inject TokenStorageService

  streamChat(apiUrl: string, payload: any, apiKey: string): Observable<string> {
    return new Observable<string>((observer) => {
      const token = this.tokenStorageService.getToken(); // Retrieve token dynamically
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
          token: token || '', // Use the retrieved token or an empty string
        },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder('utf-8');
          let buffer = '';

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
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
