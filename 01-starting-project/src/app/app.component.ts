import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  selectedUserId: string = 'u1';

  users = DUMMY_USERS;

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }

  // // example of using a function to get the selected user for legacy *ngFor
  // selectedUserToDisplay(index: any, item: { id: any; }) {
  //   return item.id;
  // }

  get userId() {
    return this.selectedUser!.id
  }

  onSelectUser(id: string) {
    console.debug('Selected user: ', id);
    this.selectedUserId = id;
  }
}
