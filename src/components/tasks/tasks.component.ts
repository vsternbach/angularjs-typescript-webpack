import { Component, Input } from 'angular-ts-decorators';
import { TasksService, ITask, PartialTask, taskStatus } from '../../tasks.service';
import { KeyboardCharCode } from '../tasklists/tasklists.component';

const template = require('./tasks.html');

@Component({
  selector: 'tasks',
  template
})
export class TasksComponent implements ng.IComponentController {
  @Input() tasklist: string;
  selectedTask: string;
  tasks: ITask[] = [];
  newItem: PartialTask;

  /*@ngInject*/
  constructor(private TasksService: TasksService) {}

  $onInit() {
    // this.getTasks();
  }

  $onChanges({tasklist}: ng.IOnChangesObject) {
    if (tasklist) {
      this.getTasks(tasklist.currentValue);
    }
  }

  get isCompleted() {
    return this.newItem && this.newItem.status === taskStatus.completed;
  }

  toggleNewItemStatus() {
    this.newItem.status = !this.isCompleted ? taskStatus.completed : taskStatus.needsAction;
  }

  begetNewItem() {
    this.newItem = {
      title: '',
      status: taskStatus.needsAction
    };
  }

  handleTyping($event: KeyboardEvent) {
    if ($event.charCode === KeyboardCharCode.Enter) {
      this.addTask();
    }
  }

  handleEsc($event: KeyboardEvent) {
    if ($event.keyCode === KeyboardCharCode.Esc) {
      this.newItem = null;
    }
  }

  async addTask() {
    try {
      const newTask = await this.TasksService.addTask(this.newItem);
      this.newItem = null;
      this.tasks.push(newTask);
    } catch (e) {
      console.error(e);
    }
  }

  removeTask($event: { task: ITask }) {
    this.tasks = this.tasks.filter(task => task.id !== $event.task.id);
  }

  async getTasks(tasklist: string) {
    try {
      this.tasks = [...await this.TasksService.getTasks(tasklist)];
    } catch (e) {
      console.error(e);
    }
  }

  selectTask($event) {
    this.selectedTask = $event.task;
  }
}
