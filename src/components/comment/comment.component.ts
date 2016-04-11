/**
 * Created by voland on 4/2/16.
 */

import Component from '../../decorators';
import './comment.scss';
import {IComment} from "../../interfaces";

@Component('app.components', 'comment', {
    bindings: {
        comment: '<'
    },
    template: `
        <div class="comment">
            <img class="gravatar" ng-src="http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="">
            <div class="email">{{$ctrl.comment.email}}</div>
            <div class="text">{{$ctrl.comment.text}}</div>
        </div>`
})
class CommentController {
    comment: IComment;

    constructor() {
    }
}