import { Component, Input, Output } from 'angular-ts-decorators';
import { ITasklist, TasksService } from '../../tasks.service';
import { KeyboardCharCode } from '../tasklists/tasklists.component';
const template = require('./tasklist.html');

@Component({
  selector: 'tasklistItem',
  template
})
export class TaskslistItemComponent implements ng.IComponentController {
  @Input() public tasklist: ITasklist;
  @Output() public onDelete: Function;
  @Output() public onSelect: Function;

  public editMode: boolean;
  public isLoading: boolean;
  public tasklistTitle: string;

  /*@ngInject*/
  constructor(private TasksService: TasksService) {}

  public $onInit() {
    this.tasklistTitle = this.tasklist.title;
  }

  public rename() {
    if (!this.editMode) {
      this.toggleEditMode();
      return;
    }
    else if (this.editMode && this.tasklistTitle !== this.tasklist.title) {
      this.updateTitle();
    }
    else {
      this.blurInput();
    }
  }

  public async updateTitle() {
    try {
      this.isLoading = true;
      const update = await this.TasksService.updateTasklist(this.tasklist.id, { title: this.tasklistTitle });
      this.tasklist = { ...this.tasklist, ...update };
    } catch (e) {
      console.error(e);
    } finally {
      this.toggleEditMode();
      this.isLoading = false;
    }
  }

  public async delete() {
    try {
      await this.TasksService.deleteTasklist(this.tasklist.id);
      this.onDelete({
        $event: { tasklist: this.tasklist}
      });
    } catch (e) {
      console.error(e);
    }
  }

  public selectTasklist() {
    this.onSelect({
      $event: { tasklist: this.tasklist}
    });
  }

  public handleTyping($event: KeyboardEvent) {
    switch ($event.charCode) {
      case KeyboardCharCode.Esc:
        break;
      case KeyboardCharCode.Enter:
        this.rename();
        break;
      default:
        break;
    }
  }

  private blurInput(reset?: boolean) {
    if (this.editMode) {
      this.toggleEditMode();
      this.tasklistTitle = this.tasklist.title;
    }
  }

  private toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
