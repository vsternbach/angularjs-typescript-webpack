/**
 * Created by voland on 4/2/16.
 */

export function Component(options: {
    selector: string,
    controllerAs?: string,
    template?: string,
    templateUrl?: string,
    bindings? : any
}, moduleOrName: string | ng.IModule = 'app.components') {
    return (controller: Function) => {
        var selector = options.selector;
        var module = typeof moduleOrName === "string"
            ? angular.module(moduleOrName)
            : moduleOrName;
        delete options.selector;
        module.component(selector, angular.extend(options, { controller: controller }));
    }
}

export function Service(moduleOrName: string | ng.IModule = 'app.services') {
    return (service: any) => {
        var name = service.name;
        var module = typeof moduleOrName === "string"
            ? angular.module(moduleOrName)
            : moduleOrName;
        module.service(name, service);
    }
}

export interface PipeTransform {
    transform(value: any, ...args: any[]): any;
}

export function Pipe(options: {name: string}, moduleOrName: string | ng.IModule = 'app.pipes') {
    return (Pipe: any) => {
        var instance = new Pipe();
        var module = typeof moduleOrName === "string"
            ? angular.module(moduleOrName)
            : moduleOrName;
        module.filter(options.name, () => instance.transform);
    }
}