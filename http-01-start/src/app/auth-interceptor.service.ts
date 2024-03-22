import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.debug('Request is intercepted: ', req);
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        });
        return next.handle(modifiedRequest)
            .pipe(
                tap(event => {
                    console.debug('Received event: ', event);
                    if (event.type === HttpEventType.Response) {
                        console.debug('Got response: ', event.body);
                    }
                })
            )
    }

}