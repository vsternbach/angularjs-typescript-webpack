import { Component, Input, Output } from 'angular-ts-decorators';
import { TasksService, ITask, taskStatus } from '../../tasks.service';

const template = require('./task.html');

@Component({
  selector: 'task',
  template
})
export class TaskComponent implements ng.IComponentController {
  public isUpdating: boolean;
  public editMode: boolean;
  @Input() public task: ITask;
  @Output() public onDelete: Function;

  /*@ngInject*/
  constructor(private TasksService: TasksService) {}

  public $onInit() {
    setTimeout(() => window['componentHandler'].upgradeAllRegistered(), 10);
  }

  public get isCompleted() {
    return TasksService.isTaskCompleted(this.task);
  }

  public toggleEditMode(off?: boolean) {
    this.editMode = off ? false : !this.editMode;
  }

  public async updateTitle() {
    this.isUpdating = true;
    try {
      await this.TasksService.updateTask(this.task.id, { title: this.task.title });
    } catch (e) {
      console.error(e);
    } finally {
      this.isUpdating = false;
    }
  }

  public async deleteTask() {
    try {
      await this.TasksService.deleteTask(this.task.id);
      this.onDelete({
        $event: { task: this.task }
      });
    } catch (e) {
      console.error(e);
    }
  }

  public async updateStatus() {
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
