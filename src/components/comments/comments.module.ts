/**
 * Created by vlad on 5/29/16.
 */
import { NgModule } from 'angular-ts-decorators';
import { CommentListComponent } from './comment-list/comments.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsService } from './comments.service';
import { FilterByTagsPipe } from './filterByTags.pipe';

@NgModule({
  name: 'CommentsModule',
  declarations: [
    CommentListComponent,
    CommentComponent,
    FilterByTagsPipe
  ],
  providers: [
    CommentsService
  ]
})
export class CommentsModule {}
