import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'myapptailwind';
  isDarkMode: boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = themeService.getIsDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.getIsDarkMode();
  }
}
