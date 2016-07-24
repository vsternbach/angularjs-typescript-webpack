import {IState, IStateProvider} from "angular-ui-router";

const appName = 'app';

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
    directives?: any[],
    pipes?: any[],
    providers?: any[]
}, moduleOrName: string | ng.IModule = `${appName}.components`) {
    return (Class: any) => {
        const selector = options.selector;
        delete options.selector;
        delete options.directives;
        delete options.pipes;
        delete options.providers;
        Class.selector = selector;
        module(moduleOrName).component(selector, angular.extend(options, { controller: Class }));
    }
}
function annotate(func: any) {
    const $injector = angular.injector(['ng']);
    func.$inject = $injector.annotate(func).map(member => member.replace(/^_/, ''));
}

export function Injectable(moduleOrName: string | ng.IModule = `${appName}.services`) {
    return (service: any) => {
        const name = service.name;
        const isProvider = service.hasOwnProperty('$get');
        annotate(service);
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
        annotate(Pipe);
        //@todo: add support for injection across all registered modules
        debugger;
        const $injector = angular.injector(['ng']);
        const instance:any = $injector.instantiate(Pipe);
        module(moduleOrName).filter(options.name, () => instance.transform.bind(instance));
    }
}

export interface IComponentState extends IState {
    state: string,
    component?: any,
    views?: { [name: string]: IComponentState }
}

function setTemplate(state: IComponentState) {
    const selector = state.component.selector;
    state.template = `<${selector}></${selector}>`;
    delete state.component;
}

export function provideStates(states: IComponentState[], $stateProvider: IStateProvider) {
    states.map((config) => {
        const name = config.state;
        const namedState = config.views;
        if (namedState) {
            const namedViews = Object.keys(namedState);
            namedViews.forEach((view) => {
                setTemplate(namedState[view]);
            });
        }
        else {
            setTemplate(config);
        }
        delete config.state;
        return { name, config };
    }).forEach(state => $stateProvider.state(state.name, state.config));
}