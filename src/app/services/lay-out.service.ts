import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayOutService {
  private _isSidebarOpen = true;

  constructor() {}

  get isSidebarOpen(): boolean {
    return this._isSidebarOpen;
  }

  set isSidebarOpen(value: boolean) {
    this._isSidebarOpen = value;
  }

  toggleSidebar(): void {
    console.log('toggleSidebar clicked');
    
    this._isSidebarOpen = !this._isSidebarOpen;
  }
}
