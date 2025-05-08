import { Component, EventEmitter, Input, Output, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input({required: true}) user!: {
    id: string;
    avatar: string;
    name: string;
  };

  @Output() select = new EventEmitter<string>();

  // convenience method to repleace @Output() select = new EventEmitter<string>();
  // this is not a Signal!
  // select = output<string>();

  // avatar = input.required<string>();
  // name = input.required<string>();

  onSelectedUser(click: Event) {
    console.debug("Got event: ", click);
    this.select.emit(this.user.id);
  }

  get imagePath(): string {
    return 'assets/users/' + this.user.avatar;
  }


  // This is a computed property that returns the path to the user's avatar image.
  // It uses the avatar property to construct the path.
  // The computed property is a function that returns a string.
  // The computed property is required to compute return values from Signals
  // imagePath = computed(() => {
  //   return 'assets/users/' + this.avatar();
  // })

}
