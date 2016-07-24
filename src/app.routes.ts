import {AppComponent} from "./components/app.component";
import {IComponentState} from "./decorators";

export const routes: IComponentState[] = [
    { state: 'root', url: '/', component: AppComponent }
];