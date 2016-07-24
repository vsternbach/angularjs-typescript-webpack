import {Component} from '../decorators';
import {CommentsComponent} from "./comment-list/comments.component";

@Component({
    selector: 'app',
    directives:  [CommentsComponent],
    template: `<comments></comments>`
})
export class AppComponent {
}