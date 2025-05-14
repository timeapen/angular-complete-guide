import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Task } from '../task/task.model';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {

  @Input({required: true}) userId!: string;

  @Output() cancelAddTask = new EventEmitter<void>();
  @Output() submitAddTask = new EventEmitter<Task>();
  
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
    let task: Task = {
      id: Math.random().toString(),
      userId: this.userId,
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDueDate
    };

    this.submitAddTask.emit(task);
  }

}
