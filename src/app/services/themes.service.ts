import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  private isDarkTheme: boolean = false;

  constructor() {}

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }

  get currentTheme(): boolean {
    return this.isDarkTheme;
  }
}
