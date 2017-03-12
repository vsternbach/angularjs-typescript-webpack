/**
 * Created by voland on 4/2/16.
 */
import * as angular from 'angular';
import { Component, Input, Output } from 'angular-ts-decorators';
import { IComment } from '../comment-list/comments.component';
import './comment.scss';
const template = require('./comment.html');

@Component({
  selector: 'comment',
  template
})
export class CommentComponent {
  public editMode: boolean;
  @Input() public comment: IComment;
  @Input() public tags: any[];
  @Output() public onAdd: Function;
  @Output() public onDelete: Function;
  private commentCopy: IComment;

  public $onInit() {
    this.editMode = !this.comment.id;
  }

  public edit() {
    this.editMode = true;
    this.commentCopy = angular.copy(this.comment);
    this.comment.inputTags = angular.copy(this.comment.tags || []);
  }

  public save() {
    this.editMode = !this.comment.id;
    if (this.comment.inputTags) {
      this.comment.tags = this.comment.inputTags.map((el: any) => el.text);
    }
    (this.onAdd || angular.noop)();
  }

  public remove() {
    (this.onDelete || angular.noop)();
  }

  public discard() {
    this.editMode = false;
    this.comment = this.commentCopy;
  }
}
