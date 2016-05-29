/**
 * Created by voland on 4/2/16.
 */

const module = function(moduleOrName) {
    return typeof moduleOrName === "string"
        ? angular.module(moduleOrName)
        : moduleOrName;
};

export function Component(options: {
    selector: string,
    controllerAs?: string,
    template?: string,
    templateUrl?: string,
    bindings? : any
}, moduleOrName: string | ng.IModule = 'app.components') {
    return (controller: Function) => {
        let selector = options.selector;
        delete options.selector;
        module(moduleOrName).component(selector, angular.extend(options, { controller: controller }));
    }
}

export function Service(moduleOrName: string | ng.IModule = 'app.services') {
    return (service: any) => {
        let name = service.name;
        if (!name) {
            console.error('Service decorator can be used with named class only');
        }
        module(moduleOrName).service(name, service);
    }
}

export interface PipeTransform {
    transform(value: any, ...args: any[]): any;
}

interface PipeTransformStatic {
    new(...args: any[]): PipeTransform;
}

export function Pipe(options: {name: string}, moduleOrName: string | ng.IModule = 'app.pipes') {
    return (Pipe: PipeTransformStatic) => {
        let instance = new Pipe();
        module(moduleOrName).filter(options.name, () => instance.transform);
    }
}