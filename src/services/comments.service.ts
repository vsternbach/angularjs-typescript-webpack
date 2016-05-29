/**
 * Created by voland on 4/2/16.
 */
import {IComment} from "../interfaces";
import {Service} from "../decorators";

@Service()
export class Comments {

    static $inject = ['$http'];
    constructor(private $http) {
    }

    getComments() {
        return this.$http.get('assets/mock.json').then((response: {data: IComment[]}) => {
            return response.data;
        });
    };
}