import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class LoggingInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.debug('Logging interceptor: ', req);
        return next.handle(req)
            .pipe(
                tap(event => {
                    if (event.type === HttpEventType.Response) {
                        console.debug('Intercepted response: ', event.body);
                    }
                })
            )
    }

}