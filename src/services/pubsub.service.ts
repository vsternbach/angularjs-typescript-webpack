/**
 * Created by voland on 4/2/16.
 */
import {Service} from "../decorators";

@Service()
export class PubSub {
    private subjects: any;

    static $inject = ['$window'];
    constructor(private $window) {
        this.subjects = {};
        // this.$window.onmessage = (event) => {
        //     let data = event.data;
        //
        //     if (data.message == '__createAlert')
        //         openCreateAlertDialog(event.data);
        //
        //     if (data.message == '__emptyCourierFetchResponse') {
        //         // TODO: report this error to our log
        //         AuthService.logout();
        //     }
        // };
    }

    emit(event: string, payload: any) {
        this.validate(event);
        this.subjects[event].forEach((callback: Function) => callback.apply(null, payload));
        // $window.parent.window.postMessage({});
    }

    on(event: string, callback: Function) {
        this.validate(event);
        this.subjects[event].push(callback);

    }

    private validate(event: string) {
        if (!this.subjects[event]) {
            this.subjects[event] = [];
        }
    }
}