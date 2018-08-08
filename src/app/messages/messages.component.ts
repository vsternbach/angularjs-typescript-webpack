import { Component, OnInit } from 'angular-ts-decorators';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  template: require('./messages.component.html'),
  styles: [require('./messages.component.scss')]
})
export class MessagesComponent implements OnInit {
  /*@ngInject*/
  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

}
