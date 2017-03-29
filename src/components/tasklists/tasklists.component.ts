import { Component, Output } from 'angular-ts-decorators';
import { TasksService, ITasklist } from '../../tasks.service';

const template = require('./tasklists.html');

export enum KeyboardCharCode {Enter = 13, Esc = 27}

@Component({
  selector: 'taskLists',
  template
})
export class TasksListsComponent implements ng.IComponentController {
  @Output() public onSelectionChange: Function;
  public tasklistTitle: string;
  public taskLists: any[];
  /*@ngInject*/
  constructor(private TasksService: TasksService, private $element: ng.IAugmentedJQuery) {}

  public async $onInit() {
    this.taskLists = await this.TasksService.getTasklists();
    window['componentHandler'].upgradeAllRegistered();
  }

  public removeTasklist($event: { tasklist: ITasklist }) {
    this.taskLists = this.taskLists.filter(list => list.id !== $event.tasklist.id);
  }

  public changeTasklist($event: { tasklist: ITasklist }) {
    this.onSelectionChange({ $event });
  }

  public handleTyping($event: KeyboardEvent) {
    if ($event.charCode === KeyboardCharCode.Enter) {
      this.addTasklist();
      this.blurInput();
    }
  }

  private async addTasklist() {
    try {
      const response = await this.TasksService.addTasklist(this.tasklistTitle);
      this.taskLists.push(response);
    } catch (e) {
      console.error(e);
    }
  }

  private blurInput() {
    this.tasklistTitle = null;
    const activeElement = document.activeElement;
    if (activeElement) {
      (<any>activeElement).blur();
    }
  }
}
