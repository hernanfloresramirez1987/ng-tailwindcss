import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilemenuComponent } from './profilemenu/profilemenu.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NotificationsComponent, ProfilemenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isNotificationsMenuOpen = signal<boolean>(false);
  isProfileMenuOpen = signal<boolean>(false);
  isSidebarMenuOpen = signal<boolean>(false);
  theme = inject(ThemeService)

  constructor() {
    effect(() => {
      console.log('isNotificationsMenuOpen: ', this.isNotificationsMenuOpen());
      console.log('isProfileMenuOpen: ', this.isProfileMenuOpen());
      console.log('isSidebarMenuOpen: ', this.isSidebarMenuOpen());
    });
    this.toggleTheme();
  }

  togglePagesMenu(){
    this.isProfileMenuOpen.mutate((res) => {
      if(res) false;
      true;
    });
  }
  toggleProfileMenu(){
    this.isProfileMenuOpen.update(res => {
      console.log(res, ' MENU PROFILE!! '+ this.isProfileMenuOpen());
      if(!res) {
        this.isNotificationsMenuOpen.update(r=>false);
      }
      return !res});
  }
  closeProfileMenu() {

  }
  toggleTheme() {
    this.theme.toggleTheme();
  }
  toggleNotificationsMenu() {
    this.isNotificationsMenuOpen.update(res => {
      console.log(res, ' MENU NOTIFICACIONES!!' + this.isNotificationsMenuOpen());
      //if(!res) {
        this.isProfileMenuOpen.update(r=>false);
      //}
      return !res
    });
  }
  closeNotificationsMenu() {

  }
  toggleSideMenu() {
    this.isSidebarMenuOpen.mutate((res) => {
      if(res) false;
      true;
    })
  }
}
