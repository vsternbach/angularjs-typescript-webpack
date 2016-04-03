/**
 * Created by voland on 4/2/16.
 */
import Component from '../../decorators';
import './comment.scss';

@Component('app.components', 'comment', {
    template: `
        <div class="comment-wrapper">
            <div class="comment" ng-class="{'comment-edit': $ctrl.editMode}">
                <div class="comment-header">
                    <div class="comment-actions">
                        <button type="button" class="comment-edit-button" title="Edit comment" ng-click="$ctrl.edit()">
                            <svg aria-hidden="true" class="octicon octicon-pencil" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M0 12v3h3l8-8-3-3L0 12z m3 2H1V12h1v1h1v1z m10.3-9.3l-1.3 1.3-3-3 1.3-1.3c0.39-0.39 1.02-0.39 1.41 0l1.59 1.59c0.39 0.39 0.39 1.02 0 1.41z"></path></svg>
                        </button>
                    </div>
                    <div class="comment-tag" ng-repeat="tag in $ctrl.comment.tags">{{tag}}</div>
                    <div class="comment-header-text">{{$ctrl.comment.title}}</div>
                    <div class="comment-edit-title">
                        <input ng-model="$ctrl.comment.title" autofocus="autofocus" class="comment-header-input" placeholder="Title" required="required" size="30" type="text">
                    </div>
                </div>
                <div class="comment-content">
                    <div class="comment-tabnav">
                        <nav class="tabnav-tabs" role="tablist">
                            <button type="button" class="btn-link tabnav-tab write-tab js-write-tab selected" role="tab">Write</button>
                            <button type="button" class="btn-link tabnav-tab preview-tab js-preview-tab" role="tab">Preview</button>
                        </nav>
                    </div>
                    <div class="write-content">
                        <textarea placeholder="Leave a comment" class="comment-textarea" ng-model="$ctrl.comment.text"></textarea>
                    </div>
                    <div class="comment-body" ng-bind-html="$ctrl.comment.text"></div>
                </div>
                <div class="form-actions">
                    <button ng-click="$ctrl.save()" class="btn btn-primary" tabindex="2">Comment</button>
                    <button ng-click="$ctrl.discard()" class="btn" tabindex="3">Discard</button>
                </div>
            </div>
        </div>`,
    bindings: {
        comment: '='
    }
})
class CommentController {
    editMode: boolean;
    comment: any;
    commentCopy: any;

    constructor() {
        this.editMode = false;
    }

    edit() {
        this.editMode = true;
        this.commentCopy = angular.copy(this.comment);
    }

    save() {
        this.editMode = false;
    }

    discard() {
        this.editMode = false;
        this.comment = this.commentCopy;
    }
}