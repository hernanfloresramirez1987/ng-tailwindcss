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

  isPagesMenuOpen = signal<boolean>(false);

  togglePagesMenu(){
    console.log(this.isPagesMenuOpen());
    this.isPagesMenuOpen.update(res => {
      if(res) return false;
      return true;
    })
  }
}
