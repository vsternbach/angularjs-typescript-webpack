/**
 * Created by voland on 4/2/16.
 */
import Component from '../../decorators';
import './comment.scss';
import {IComment} from "../../interfaces";
import md5 = require('blueimp-md5');

const GRAVATAR_URL = 'http://www.gravatar.com/avatar/';

@Component('app.components', 'comment', {
    bindings: {
        comment: '<'
    },
    template: `
        <div class="comment">
            <img class="gravatar" ng-src="{{$ctrl.hash()}}" alt="">
            <div class="email">{{$ctrl.comment.email}}</div>
            <div class="text">{{$ctrl.comment.text}}</div>
        </div>`
})
class CommentController {
    comment: IComment;

    constructor() {}

    hash(email) {
        return GRAVATAR_URL + md5(email);
    }
}