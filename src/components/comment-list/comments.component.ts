/**
 * Created by voland on 4/2/16.
 */
import Component from '../../decorators';
import './comment-list.scss';
import {IComment} from "../../interfaces";

@Component('app.components', 'comments', {
    template: `
        <div class="container">
            <form name="comment-form" class="comment-form" ng-submit="$ctrl.addComment()">
                <input ng-model="$ctrl.newComment.email" autofocus="autofocus" class="comment-form-email input" placeholder="Email" type="text">
                <textarea ng-model="$ctrl.newComment.text" autofocus="autofocus" class="comment-form-text textarea" placeholder="Message"></textarea>
                <input class="comment-form-submit" type="submit" value="Submit">
            </form>
            <div class="comment-list">
                <input ng-model="$ctrl.commentFilter" autofocus="autofocus" class="comment-filter input" placeholder="Filter" type="text">
                <comment ng-repeat="comment in $ctrl.comments | filter:$ctrl.commentFilter track by $index" comment="comment"></comment>
            </div>
        </div>`
})
class CommentsController {
    newComment: IComment;
    comments: IComment[];
    commentFilter: string;

    static $inject = ['Comments'];
    constructor(private Comments) {
        this.newComment = null;
        this.comments = [];
    }
    //
    // private getCommentId() {
    //     let arr = this.comments.map((el) => el.id);
    //     return arr.length ? Math.max(...arr) + 1 : 1;
    // }

    addComment() {
        this.comments.push(angular.copy(this.newComment));
        this.newComment = null;
    }
}