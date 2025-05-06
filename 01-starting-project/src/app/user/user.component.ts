import { Component } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
console.log("Dummy Users length: ", DUMMY_USERS.length);
console.log("random index: ", randomIndex);


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  selectedUser = DUMMY_USERS[randomIndex];

  getImagePath(): string {
    return "assets/users" + this.selectedUser.avatar;
  }

}
