import { Injectable } from "@angular/core";
import { response, Message, MessagesTypes } from "./response.interface";
import { ApiError } from "./api-error.class";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToastService } from "./toast.service";

@Injectable()
export class ResponseHandlerService {

  constructor(
    private ToastService: ToastService,
  ) {}

  /**
   * - Retorna função Manipuladora da response com data,
   * - Gera Api error caso response isSucceed retornar false
   */
  handler<T>() {
    return (response: response<T>) => {
      this.ToastService.toast(response.messages);
      if (response.isSucceed) {
        return response.data;
      } else {
        throw new ApiError(response.messages);
      }
    };
  }

  /**
   * - Manipulador da response com count, data, messages e isSucceed
   * - Gera Api error caso response isSucceed retornar false
   */
  fullHandler<T>() {
    return (response: response<T>) => {
      this.ToastService.toast(response.messages);
      if (response.isSucceed) {
        return response;
      } else {
        throw new ApiError(response.messages);
      }
    };
  }

  errorHandler() {
    return (error) => {
      if(error instanceof HttpErrorResponse && error.status !== 401 && error.status !== 403) {
        this.ToastService.toast({type: MessagesTypes.error, description: `Falha ao conectar com o servidor - Erro ${error.status}`});
      }

      return Observable.throw(error);
    }
  }
}
