import { CommonModule } from '@angular/common';
import { Component, signal, OnInit, inject, computed, effect } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NotificationsComponent } from 'src/app/components/header/notifications/notifications.component';
import { ProfilemenuComponent } from 'src/app/components/header/profilemenu/profilemenu.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { DemoService } from 'src/app/services/demo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, NotificationsComponent, ProfilemenuComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  from = signal('Hamburg'); // in Germany
  to = signal('Graz'); // in Austria
  flights = signal<any[]>([]);

  flightRoute = computed(() => this.from() + ' to ' + this.to());

  constructor() {
    effect(() => {
      this.search();
    });
  }


  ////////
  isProfileMenuOpen = signal<boolean>(false)
  confirmations = signal<any>([]);
  servDemo = inject(DemoService);

  array = signal<any[]>([]);

  ngOnInit() {
    this.servDemo.getAccountsList(2)
      .subscribe(res => {
        this.confirmations.set(res);
        console.log(this.confirmations());
      })
  }

  togglePagesMenu(){
    this.isProfileMenuOpen.mutate((res) => {
      if(res) false;
      true;
    })
  }
  toggleProfileMenu(){
    this.isProfileMenuOpen.update(res => !res);
  }
  closeProfileMenu() {

  }
  toggleTheme() {

  }
  toggleNotificationsMenu() {

  }
  closeNotificationsMenu() {

  }
  toggleSideMenu() {

  }



  async search() {
    if (!this.from() || !this.to()) return;

    /*const flights = await this.flightService.findPromise(
      this.from(),
      this.to()
    );*/
    ///this.flights.set(flights);
    console.log('linea 73.- ' + this.flightRoute());
  }
}
