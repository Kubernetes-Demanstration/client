import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusyService } from '../services/busy.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method === 'POST' && request.url.includes('orders')) {
      return next.handle(request);
    }

    if (!request.url.includes('emailexists')) { // turn off loading spinner for checking email exists
      this.busyService.busy();
    }
    return next.handle(request).pipe(
      delay(1000),  // simulate bad internet connection
      finalize(() => {
        this.busyService.idle();
      })
    );
  }
}
