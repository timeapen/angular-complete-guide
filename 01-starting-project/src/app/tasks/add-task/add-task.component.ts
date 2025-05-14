import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from './new-task.model';



@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {

  @Output() cancelAddTask = new EventEmitter<void>();
  @Output() submitAddTask = new EventEmitter<NewTask>();
  
  enteredTitle: string = '';
  enteredSummary: string = '';
  enteredDueDate: string = '';
  
  // enteredTitle = signal('');
  // enteredSummary = signal('');
  // enteredDueDate = signal('');
  

  onCancel() {
    console.debug('Cancel add task');
    this.cancelAddTask.emit();
  }

  onSubmitAddTask() {
    let task: NewTask = {
      id: Math.random().toString(),
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDueDate
    };

    this.submitAddTask.emit(task);
  }

}
