import { Injectable } from '@angular/core';
import { Task } from './task/task.model';
import { Observable, of } from 'rxjs';
import { NewTask } from './add-task/new-task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  private addTask(newTask: Task): void {
    this.tasks.push(newTask);
  }

  completeTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

    addNewTask(newTaskData: NewTask, userId: string) {
      const task: Task = {
        id: newTaskData.id,
        userId: userId,
        title: newTaskData.title,
        summary: newTaskData.summary,
        dueDate: newTaskData.dueDate,
      };
  
      this.addTask(task);
    }
}