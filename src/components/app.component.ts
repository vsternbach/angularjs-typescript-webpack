import {Component} from '../decorators';
import {appName} from "../app.config";
import {ListComponent} from "./list/list.component";

@Component({
    selector: appName,
    directives: [ListComponent],
    template: `
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Swapi</a>
            </div>
        
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
                <li ui-sref-active="active"><a ui-sref="app.list({type: 'films'})">Films</a></li>
                <li ui-sref-active="active"><a ui-sref="app.list({type: 'people'})">Characters <span class="sr-only">(current)</span></a></li>
              </ul>
            </div><!-- /.navbar-collapse -->
          </div><!-- /.container-fluid -->
        </nav>
        <ui-view></ui-view>`
})
export class AppComponent {
}