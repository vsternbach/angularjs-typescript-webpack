import {Injectable} from "../decorators";

@Injectable()
export class CommentsService {

    constructor(private _$http) {
        console.log(`CommentsService register`);
    }

    getComments() {
        return this._$http.get('assets/mock.json').then(response => response.data);
    };
}