import { Component, Input, Output } from 'angular-ts-decorators';
import { ITasklist, TasksService } from '../../tasks.service';
import { KeyboardCharCode } from '../tasklists/tasklists.component';
const template = require('./tasklist.html');

@Component({
  selector: 'tasklistItem',
  template
})
export class TaskslistItemComponent implements ng.IComponentController {
  @Input() tasklist: ITasklist;
  @Output() onDelete: Function;
  @Output() onSelect: Function;

  editMode: boolean;
  isLoading: boolean;
  tasklistTitle: string;

  /*@ngInject*/
  constructor(private TasksService: TasksService) {}

  $onInit() {
    this.tasklistTitle = this.tasklist.title;
  }

  rename() {
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

  async updateTitle() {
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

  async delete() {
    try {
      await this.TasksService.deleteTasklist(this.tasklist.id);
      this.onDelete({
        $event: { tasklist: this.tasklist}
      });
    } catch (e) {
      console.error(e);
    }
  }

  selectTasklist() {
    this.onSelect({
      $event: { tasklist: this.tasklist}
    });
  }

  handleTyping($event: KeyboardEvent) {
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
