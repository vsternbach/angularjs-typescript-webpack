/**
 * Created by voland on 4/2/16.
 */
import {Component, Injectable} from '../../decorators';
import './comment-list.scss';
import {IComment} from "../../interfaces";
import {CommentComponent} from "../comment/comment.component";
import {CommentsService} from "../../services/comments.service";
import {FilterByTagsPipe} from "../../pipes/filterByTags";

@Component({
    selector: 'comments',
    directives:  [CommentComponent],
    providers:   [CommentsService],
    pipes: [FilterByTagsPipe],
    template: `
        <div class="container-fluid">
            <div class="discussion-timeline">
                <tags-input ng-model="$ctrl.tagFilter">
                    <auto-complete source="$ctrl.tags"></auto-complete>
                </tags-input>
                <comment ng-repeat="comment in $ctrl.comments | filterByTags:$ctrl.tagFilter" comment="comment" tags="$ctrl.tags" on-delete="$ctrl.deleteComment(comment)"></comment>
                <comment comment="$ctrl.emptyComment" on-add="$ctrl.addComment()" tags="$ctrl.tags"></comment>
            </div>
        </div>`
})

@Injectable()
export class CommentsComponent {
    comments: IComment[];
    emptyComment: IComment;
    tags: string[];
    tagFilter: any[];
    
    constructor(private _CommentsService: CommentsService) {
        this.emptyComment = {};
        this.tagFilter = [];
        _CommentsService.getComments().then((comments) => {
            this.comments = comments;
            this.tags = this.comments
                .map((el) => el.tags)
                .reduce((prev, curr) => [...prev, ...curr])
                .filter((elem, pos, arr) => arr.indexOf(elem) == pos);
        });
    }

    private getCommentId() {
        let arr = this.comments.map((el) => el.id);
        return Math.max(...arr) + 1;
    }

    addComment() {
        this.emptyComment.id = this.getCommentId();
        this.comments.push(this.emptyComment);
        this.emptyComment = {};
    }

    deleteComment(comment: IComment) {
        let index = this.comments.indexOf(comment);
        this.comments.splice(index, 1);
    }
}