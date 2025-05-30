import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { NewTask } from './add-task/new-task.model';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all tasks', (done: DoneFn) => {
    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(3); // Initial tasks in the service
      done();
    });
  });

  it('should return tasks for a specific user', (done: DoneFn) => {
    const userId = 'u3';
    service.getTasksForUser(userId).subscribe((tasks) => {
      expect(tasks.length).toBe(2); // User 'u3' has 2 tasks in the mock data
      expect(tasks.every((task) => task.userId === userId)).toBeTrue();
      done();
    });
  });

  it('should add a new task', () => {
    const newTask: NewTask = {
      id: 't4',
      title: 'New Task',
      summary: 'This is a new task',
      dueDate: '2025-01-01',
    };

    service.addNewTask(newTask, 'u2');

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(4);
      expect(tasks.some((task) => task.id === 't4')).toBeTrue();
    });
  });

  it('should complete a task', () => {
    service.removeTask('t1');

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2); // One task removed
      expect(tasks.some((task) => task.id === 't1')).toBeFalse();
    });
  });
});