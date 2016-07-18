/**
 * Created by voland on 4/2/16.
 */
import {Service, Injectable} from "../decorators";

const URL = 'http://swapi.co/api/';

@Injectable()
@Service()
export class SwapiService {
    
    constructor(private $http) {
    }

    getData(type) {
        return this.$http.get(`${URL}${type}`, {cache: true}).then((response: any) => {
            return response.data;
        });
    };
}