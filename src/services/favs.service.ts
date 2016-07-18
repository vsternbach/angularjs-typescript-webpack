/**
 * Created by voland on 4/2/16.
 */
import {Service, Injectable} from "../decorators";

@Injectable()
@Service()
export class FavsService {

    constructor(private $localStorage) {
        this.$localStorage.films = this.$localStorage.films || {};
        this.$localStorage.people = this.$localStorage.people || {};
    }

    isFav(type, id) {
        return this.$localStorage[type][id] ? true : false;
    };
    
    add(type, id) {
        this.$localStorage[type][id] = true;
    } 
    
    remove(type, id) {
        delete this.$localStorage[type][id];
    }
}