/**
 * Created by voland on 4/2/16.
 */
import Component from '../../decorators';
import './comment-list.scss';

@Component('app.components', 'comments', {
    template: `
        <div class="container-fluid">
            <div class="discussion-timeline">
              <comment ng-repeat="comment in $ctrl.comments" comment="comment"></comment>
              <!--<comment></comment>-->
            </div>
        </div>`
})
class CommentsController {
    comments;

    static $inject = ['Comments'];
    constructor(private Comments) {
        Comments.getComments().then((comments) => {
            this.comments = comments
        });
    }
}