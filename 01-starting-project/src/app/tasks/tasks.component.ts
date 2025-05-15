import { Component, Input, OnInit } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { AddTaskComponent } from './add-task/add-task.component';
import { NewTask } from './add-task/new-task.model';
import { TasksService } from './tasks.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, AddTaskComponent, AsyncPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  @Input({ required: true }) name!: string;
  @Input({ required: true }) userId!: string;

  addTask: boolean = false;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  get userTasks$(): Observable<Task[]> {
    return this.tasksService.getTasksForUser(this.userId);
  }

  onCompleteTask(id: string) {
    this.tasksService.removeTask(id);
  }

  onAddTask() {
    this.addTask = true;
  }

  onCancelAddTask() {
    console.debug('Got cancel add task on tasks page.');
    this.addTask = false;
  }

  onSubmitAddTask(newTaskData: NewTask) {
    const task: Task = {
      id: newTaskData.id,
      userId: this.userId,
      title: newTaskData.title,
      summary: newTaskData.summary,
      dueDate: newTaskData.dueDate,
    };

    this.tasksService.addNewTask(task, this.userId)
    this.addTask = false;
  }
}
