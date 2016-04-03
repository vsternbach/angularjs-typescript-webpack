/**
 * Created by voland on 4/2/16.
 */
export class Comments {

    static $inject = ['$http', '$q'];
    constructor(private $http, private $q) {
        console.log('Comments service')
    }

    getComments() {
        return this.$http.get('mock.json').then((response) => {
            return response.data;
        });
    };

}