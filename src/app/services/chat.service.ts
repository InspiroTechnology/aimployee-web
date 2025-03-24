import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  streamChat(apiUrl: string, payload: any, apiKey: string): Observable<string> {
    return new Observable<string>((observer) => {
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
          token:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjozfSIsImlhdCI6MTc0Mjg1ODYxNiwiZXhwIjoxNzQyODgwMjE2fQ.Lg9vnhag0Glc3TMgWc_7tr90iK-OaSY970jWM7zUSQtLMcnCde8XlvR8_2frnQcVFfjSHEcuTsUOngFMEEZ0eA',
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
