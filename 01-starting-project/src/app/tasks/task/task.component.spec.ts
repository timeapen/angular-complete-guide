import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = {
      id: '1',
      userId: '1',
      title: 'Test Task',
      summary: 'This is a test task',
      dueDate: '2023-10-01'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the task title', () => {
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Test Task');
  });

  it('should display the task summary', () => {
    const summaryElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(summaryElement.textContent).toContain('This is a test task');
  });

  it('should display the formatted due date', () => {
    const dateElement = fixture.debugElement.query(By.css('time')).nativeElement;
    expect(dateElement.textContent).toContain('Sunday, October 1, 2023'); // Adjust based on the locale
  });

  it('should emit the complete event when the button is clicked', () => {
    spyOn(component.complete, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.complete.emit).toHaveBeenCalledWith('1');
  });
});
