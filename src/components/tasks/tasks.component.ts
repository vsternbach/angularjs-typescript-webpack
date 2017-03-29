import { Component, Input } from 'angular-ts-decorators';
import { TasksService, ITask, PartialTask, taskStatus } from '../../tasks.service';
import { KeyboardCharCode } from '../tasklists/tasklists.component';

const template = require('./tasks.html');

@Component({
  selector: 'tasks',
  template
})
export class TasksComponent implements ng.IComponentController {
  @Input() public tasklist: string;
  public selectedTask: string;
  public tasks: ITask[] = [];
  public newItem: PartialTask;

  /*@ngInject*/
  constructor(private TasksService: TasksService) {}

  public $onInit() {
    // this.getTasks();
  }

  public $onChanges({tasklist}: ng.IOnChangesObject) {
    if (tasklist) {
      this.getTasks(tasklist.currentValue);
    }
  }

  public get isCompleted() {
    return this.newItem && this.newItem.status === taskStatus.completed;
  }

  public toggleNewItemStatus() {
    this.newItem.status = !this.isCompleted ? taskStatus.completed : taskStatus.needsAction;
  }

  public begetNewItem() {
    this.newItem = {
      title: '',
      status: taskStatus.needsAction
    };
  }

  public handleTyping($event: KeyboardEvent) {
    if ($event.charCode === KeyboardCharCode.Enter) {
      this.addTask();
    }
  }

  public handleEsc($event: KeyboardEvent) {
    if ($event.keyCode === KeyboardCharCode.Esc) {
      this.newItem = null;
    }
  }

  public async addTask() {
    try {
      const newTask = await this.TasksService.addTask(this.newItem);
      this.newItem = null;
      this.tasks.push(newTask);
    } catch (e) {
      console.error(e);
    }
  }

  public removeTask($event: { task: ITask }) {
    this.tasks = this.tasks.filter(task => task.id !== $event.task.id);
  }

  public async getTasks(tasklist: string) {
    try {
      this.tasks = [...await this.TasksService.getTasks(tasklist)];
    } catch (e) {
      console.error(e);
    }
  }

  public selectTask($event) {
    this.selectedTask = $event.task;
  }
}
