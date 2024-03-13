import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.debug('Request is intercepted: ', req);
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        });
        return next.handle(modifiedRequest);
    }

}