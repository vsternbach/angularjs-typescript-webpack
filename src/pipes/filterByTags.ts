/**
 * Created by voland on 4/2/16.
 */

import {PipeTransform, Pipe} from '../decorators';

@Pipe({name: 'filterByTags'})
export class FilterByTagsPipe implements PipeTransform {
    transform(comments:any, tags:any) {
        if (!tags.length) return comments;
        function check(comment) {
            let filterArray = tags.map((tag: any) => tag.text);
            let findCount = filterArray
                .map((tag) => comment.tags.indexOf(tag) > -1 ? 1 : 0)
                .reduce((prev, curr) => prev + curr);
            return findCount === filterArray.length;
        }
        return comments.filter(check);
    }
}