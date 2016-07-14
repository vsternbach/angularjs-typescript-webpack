import {Component} from '../decorators';
import {appName} from "../app.config";
import {CommentsComponent} from "./comment-list/comments.component";

@Component({
    selector: appName,
    directives:  [CommentsComponent],
    template: `<comments></comments>`
})
export class AppComponent {
}