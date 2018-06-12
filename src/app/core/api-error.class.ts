import { Message } from './response.interface';
import { Injectable } from '@angular/core';

/**
 * Erro de api
 * @extends Error
 * @description gerado caso uma resposta do server venha com success false
 */
@Injectable()
export class ApiError extends Error {
  constructor(public messages: Message[]) {
    super('API - '+messages.map(m=>m.description).join(', '));

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
