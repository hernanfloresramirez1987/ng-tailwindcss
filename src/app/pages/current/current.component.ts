import { Component, OnInit, inject, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user';
import { ClasicService } from 'src/app/services/clasic.service';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CurrentService } from 'src/app/services/current.service';

@Component({
  selector: 'app-current',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CurrentComponent implements OnInit {
  public users = signal<User[]>([]);
  public currentPage = signal(1);
  public totalpages = signal<number[]>([]);
  public forpage = signal(0);
  userService = inject(ClasicService);

  currentService = inject(CurrentService);


  ////////////////
  newTask = signal('');
  tasks = signal<User[]>([{
    id: 0,
    first_name: "ana",
    last_name: "portillo",
    email: "email.gom",
    avatar: "avatar"
  }]);

  iscondicion = computed(() => {
    console.log('Computed: ', this.tasks());
    return this.tasks().length > 4
  });

  addTask() {
    console.log("addTask()", this.newTask())
    this.tasks.update(res => [...res, {
      id: 777,
      first_name: "nombre 9",
      last_name: "apellido 9",
      email: "email.gom 9",
      avatar: "d 9"
    }]);
    this.newTask.set('');
  }
  changeFirstTask() {
    //this.tasks[0] =  `Task 1 changed ${new Date().getTime()}`
    this.tasks.update((tasks) => {
      //tasks[0] = `Task1 changed ${new Date().getTime()}`;
      return tasks;
    })
  }
  check() {
    console.log('Called panel ClasicComponent');
    return true;
  }
  resetTask() {
    this.tasks.set([]);
  }


  ngOnInit(): void {
      this.loadUserxPage(this.currentPage());
  }
  async loadUserxPage(page: number) {
    if(page<=0) {
      console.error('No se admiten numeros de page menores o iguales a 0')
      return;
    }
    await this.userService.loadPage(page)
      .subscribe(res => {
        console.log(res);
        this.currentPage.update(t => page);
        this.forpage.update(() => res.per_page);
        this.users.update(currentUsers => [...currentUsers, ...res.data]);
      });
  }
  updateUser(user: User) {
    this.users.mutate(users => {
      console.log(users);
      const existId = this.users().find((t) => t.id === user.id);
      if(existId) {
        this.currentService
          .updateUser(existId.id, user)
          .subscribe(resp => {
            console.log(resp);
            existId.first_name = "user.first_name";
            existId.last_name = "user.last_name";
            existId.email = "user.email";
            existId.avatar = "user.avatar";
          });
      }
      return this.users();
    })
  }
}
