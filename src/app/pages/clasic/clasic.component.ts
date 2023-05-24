import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user';
import { ClasicService } from 'src/app/services/clasic.service';
import { filter } from 'rxjs';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clasic',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
  templateUrl: './clasic.component.html',
  styleUrls: ['./clasic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ClasicComponent implements OnInit {

  public users: User[] = [];
  public currentPage: number = 1;
  public totalpages: number[] = [];
  public forpage: number = 0;
  userService = inject(ClasicService);
  ////////
  das!: string;
  public newTask = "";
  tasks = ['task1', 'task2', 'task3'];

  addTask() {
    console.log("addTask()", this.newTask)
    this.tasks.push(this.newTask);
    this.newTask = '';
  }
  changeFirstTask() {
    this.tasks[0] =  `Task 1 changed ${new Date().getTime()}`
  }
  check() {
    console.log('Called panel ClasicComponent');
    return true;
  }

  ////////
  ngOnInit(): void {
    this.loadUserxPage(this.currentPage);
  }

  async loadUserxPage(page: number) {
    if(page<=0) {
      console.error('No se admiten numeros de page menores o iguales a 0')
      return;
    }
    await this.userService.loadPage(page)
      .subscribe(res => { //console.log(res.data)
        this.totalpages = [];
        this.currentPage = page;
        this.users = res.data;
        this.forpage = res.per_page;
        for(let i=0; i<res.total_pages; i++) {
          this.totalpages.push(i);
        }
      });
  }

}
