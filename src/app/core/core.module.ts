import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { InterceptorService } from './interceptor.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ResponseHandlerService } from './response-handler.service';
import { ToastService } from './toast.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    AuthGuard,
    AuthService,
    ToastService,
    ResponseHandlerService
  ]
})
export class CoreModule { }
