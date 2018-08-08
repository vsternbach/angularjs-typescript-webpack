import { Injectable } from 'angular-ts-decorators';

@Injectable('messageService')
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.unshift(message);
  }

  clear() {
    this.messages = [];
  }
}
