import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {

  @Output() cancelAddTask = new EventEmitter<boolean>();

  onCancel() {
    console.debug('Cancel add task');
    this.cancelAddTask.emit(false);
  }

}
