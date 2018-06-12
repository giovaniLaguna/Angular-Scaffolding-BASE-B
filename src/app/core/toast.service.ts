import { Injectable } from '@angular/core';
import { Message, isMessage, MessagesTypes } from './response.interface';

@Injectable()
export class ToastService {

  private toastTime = 4000;
  private messagesClass: Map<MessagesTypes, string>;

  constructor(
  ) {
    this.messagesClass = new Map();
    this.messagesClass.set(undefined, undefined);
    this.messagesClass.set(MessagesTypes.default, undefined);
    this.messagesClass.set(MessagesTypes.error, 'toast__error');
    this.messagesClass.set(MessagesTypes.info, 'toast__info');
    this.messagesClass.set(MessagesTypes.success, 'toast__success');
    this.messagesClass.set(MessagesTypes.warning, 'toast__warning');
  }

  toast(item: Message | Message[] | string, type?: MessagesTypes | number ) {
    if(item instanceof Array) {
      item.forEach( item => this.toast(item));
    } else if(isMessage(item)){
      this.toast(item.description, item.type);
    } else if (typeof item == 'string') {
      this._toast(item, type);
    } else {
      console.error('parametro invalido ao emitir um toast');
    }
  }

  private _toast(message: string, type?: MessagesTypes | number ) {
    //this.MzToastService.show(message, this.toastTime, this.messagesClass.get(type));
  }

}
