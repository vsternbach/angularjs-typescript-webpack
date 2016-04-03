/**
 * Created by voland on 4/2/16.
 */
import {IComment} from "../interfaces";

export class Comments {

    static $inject = ['$http'];
    constructor(private $http) {
    }

    getComments() {
        return this.$http.get('mock.json').then((response: {data: IComment[]}) => {
            return response.data;
        });
    };
}