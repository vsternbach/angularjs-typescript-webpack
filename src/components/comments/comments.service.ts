import { Injectable } from 'angular-ts-decorators';

@Injectable('CommentsService')
export class CommentsService {
  /*@ngInject*/
  constructor(private $http: ng.IHttpService) {
    console.log(`CommentsService register`);
  }

  public getComments() {
    return this.$http.get('assets/mock.json').then(response => response.data);
  };
}
