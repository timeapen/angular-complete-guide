import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {

  @Output() cancelAddTask = new EventEmitter<void>();
  // enteredTitle: string = '';
  // enteredSummary: string = '';
  // enteredDueDate: string = '';
  
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDueDate = signal('');
  

  onCancel() {
    console.debug('Cancel add task');
    this.cancelAddTask.emit();
  }

}
