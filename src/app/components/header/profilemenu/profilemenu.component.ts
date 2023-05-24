import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profilemenu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profilemenu.component.html',
  styleUrls: ['./profilemenu.component.css']
})
export class ProfilemenuComponent {
  closeProfileMenu() {

  }
}
