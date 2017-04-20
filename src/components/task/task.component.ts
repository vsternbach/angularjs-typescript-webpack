import { Component, Input, Output } from 'angular-ts-decorators';
import { TasksService, ITask, taskStatus } from '../../tasks.service';

const template = require('./task.html');

@Component({
  selector: 'task',
  template
})
export class TaskComponent implements ng.IComponentController {
  isUpdating: boolean;
  editMode: boolean;
  @Input() task: ITask;
  @Output() onDelete: Function;

  /*@ngInject*/
  constructor(private TasksService: TasksService) {}

  $onInit() {
    setTimeout(() => window['componentHandler'].upgradeAllRegistered(), 10);
  }

  get isCompleted() {
    return TasksService.isTaskCompleted(this.task);
  }

  toggleEditMode(off?: boolean) {
    this.editMode = off ? false : !this.editMode;
  }

  async updateTitle() {
    this.isUpdating = true;
    try {
      await this.TasksService.updateTask(this.task.id, { title: this.task.title });
    } catch (e) {
      console.error(e);
    } finally {
      this.isUpdating = false;
    }
  }

  async deleteTask() {
    try {
      await this.TasksService.deleteTask(this.task.id);
      this.onDelete({
        $event: { task: this.task }
      });
    } catch (e) {
      console.error(e);
    }
  }

  async updateStatus() {
    this.isUpdating = true;
    const status = !this.isCompleted ? taskStatus.completed : taskStatus.needsAction;
    try {
      const update = await this.TasksService.updateTask(this.task.id, { status });
      this.task = { ...this.task, ...update };
    } catch (e) {
      console.error(e);
    } finally {
      this.isUpdating = false;
    }
  }
}
