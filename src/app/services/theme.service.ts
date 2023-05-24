import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode =signal<boolean>(false);
  constructor() {
    this.isDarkMode.set(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  }
  getIsDarkMode(): boolean {
    console.log(this.isDarkMode)
    return this.isDarkMode();
  }
  toggleTheme(): void {
    this.isDarkMode.update(() => !this.isDarkMode());
    document.documentElement.classList.toggle('dark');
  }
}
