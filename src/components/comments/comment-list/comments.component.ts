/**
 * Created by voland on 4/2/16.
 */
import { Component } from 'angular-ts-decorators';
import './comment-list.scss';

export interface IComment {
  id?: number;
  title?: string;
  text?: string;
  tags?: string[];
  inputTags?: string[];
}

@Component({
  selector: 'commentList',
  template: `
        <div class="container-fluid">
            <div class="discussion-timeline">
                <tags-input ng-model="$ctrl.tagFilter">
                    <auto-complete source="$ctrl.tags"></auto-complete>
                </tags-input>
                <comment ng-repeat="comment in $ctrl.comments | filterByTags:$ctrl.tagFilter" 
                comment="comment" tags="$ctrl.tags" on-delete="$ctrl.deleteComment(comment)"></comment>
                <comment comment="$ctrl.emptyComment" on-add="$ctrl.addComment()" tags="$ctrl.tags"></comment>
            </div>
        </div>`
})
export class CommentListComponent implements ng.IComponentController {
  public comments: IComment[];
  public emptyComment: IComment;
  public tags: string[];
  public tagFilter: any[];

  /*@ngInject*/
  constructor(private CommentsService) {}

  public $onInit() {
    this.emptyComment = {};
    this.tagFilter = [];
    this.CommentsService.getComments().then((comments) => {
      this.comments = comments;
      this.tags = this.comments
        .map((el) => el.tags)
        .reduce((prev, curr) => [...prev, ...curr])
        .filter((elem, pos, arr) => arr.indexOf(elem) === pos);
    });
  }

  public addComment() {
    this.emptyComment.id = this.getCommentId();
    this.comments.push(this.emptyComment);
    this.emptyComment = {};
  }

  public deleteComment(comment: IComment) {
    let index = this.comments.indexOf(comment);
    this.comments.splice(index, 1);
  }

  private getCommentId() {
    let arr = this.comments.map((el) => el.id);
    return Math.max(...arr) + 1;
  }
}
