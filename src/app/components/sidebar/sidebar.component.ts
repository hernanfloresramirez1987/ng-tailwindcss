import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  isProfileMenuOpen = signal<boolean>(false)

  togglePagesMenu(){
    this.isProfileMenuOpen.mutate((res) => {
      if(res) false;
      true;
    })
  }
}
