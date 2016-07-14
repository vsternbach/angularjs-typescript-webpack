import {appName} from "./app.config";

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
    bindings?: any,
    require?: any,
    directives?: any[]
    pipes?: any[]
    providers?: any[]
}, moduleOrName: string | ng.IModule = `${appName}.components`) {
    return (controller: any) => {
        const selector = options.selector;
        delete options.selector;
        delete options.directives;
        delete options.pipes;
        delete options.providers;
        module(moduleOrName).component(selector, angular.extend(options, { controller: controller }));
    }
}

export function Service(moduleOrName: string | ng.IModule = `${appName}.services`) {
    return (service: any) => {
        const name = service.name;
        const isProvider = service.hasOwnProperty('$get');
        if (!name) {
            console.error('Service decorator can be used with named class only');
        }
        module(moduleOrName)[isProvider ? 'provider' : 'service'](name, service);
    }
}

interface PipeTransformStatic {
    new(...args: any[]): PipeTransform;
}

export interface PipeTransform {
    transform(value: any, ...args: any[]): any;
}

export function Pipe(options: {name: string}, moduleOrName: string | ng.IModule = `${appName}.pipes`) {
    return (Pipe: PipeTransformStatic) => {
        const filter = () => {
            console.log(Pipe.$inject);
            //@todo: add support for injection across all registered modules
            const $injector = angular.injector(['ng']);
            const instance:any = $injector.instantiate(Pipe);
            return instance.transform.bind(instance);
        };
        module(moduleOrName).filter(options.name, filter);
    }
}


export function Injectable() {
    return (Class: any) => {
        const $injector = angular.injector(['ng']);
        Class.$inject = $injector.annotate(Class).map((member) => member.replace(/^_/, ''));
    }
}

export function bootstrap(appName: string, appClass: any) {
    return (anything: any) => {
        if (!appClass) {
            console.error(`Please provide main component class as a second argument to @bootstrap decorator`);
        }
        angular.element(document).ready(() => {
            angular.bootstrap(document, [appName]);
        });
    }
}