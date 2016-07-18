/**
 * Created by voland on 4/2/16.
 */
import {Component, Injectable} from '../../decorators';
import './list.scss';
import {SwapiService} from "../../services/swapi.service";
import {FavsService} from "../../services/favs.service";

const enum Status {Loading, Success, Error}

@Component({
    selector: 'list',
    providers:   [SwapiService, FavsService],
    template: `
        <div class="content" ng-switch="$ctrl.loadStatus">
            <table ng-switch-when="${Status.Success}" class="table table-striped table-bordered">
                <tr ng-repeat="item in $ctrl.items track by $index">
                  <td>{{$index+1}}</td>
                  <td>{{item.title || item.name}}</td>
                  <td>
                    <a ng-click="$ctrl.toggleFav($ctrl.type, $index+1)" href="javascript:">
                    <i class="glyphicon" ng-class="$ctrl.isFav($ctrl.type, $index+1) ? 'glyphicon-heart' : 'glyphicon-heart-empty'"></i></a>
                  </td>
                </tr>
              </table>
              <div ng-switch-when="${Status.Loading}" class="alert alert-info" role="alert">Loading data...</div>
              <div ng-switch-when="${Status.Error}" class="alert alert-danger" role="alert">Something went bad, try refreshing the page in a while</div>
        </div>`
})

@Injectable()
export class ListComponent {
    items: any;
    type: string;
    loadStatus: Status;

    constructor(private $stateParams, private SwapiService, private FavsService) {
        this.type = $stateParams.type;
        this.loadStatus = Status.Loading;
        SwapiService.getData(this.type).then(
            (data) => {
                this.items = data.results;
                this.loadStatus = Status.Success;
            },
            (error) => {
                this.loadStatus = Status.Error;
            }
        );
    }

    isFav(type, id) {
        return this.FavsService.isFav(type, id);
    }

    toggleFav(type, id) {
        this.FavsService.isFav(type, id) ? this.FavsService.remove(type, id) : this.FavsService.add(type, id);
    }
}