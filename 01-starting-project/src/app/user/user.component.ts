import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input() avatar!: string;
  @Input() name!: string;


  onSelectedUser(click: Event) {
    console.debug("Got event: ", click);
  }

  get imagePath(): string {
    return 'assets/users/' + this.avatar;
  }

}
