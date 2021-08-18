import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { finalize } from "rxjs/operators";
export const skipTokenHeader = 'Authorization';
export const skipJSONContentTypeHeader = 'Content-Type';

@Injectable({
    providedIn: 'root'
})

export class HttpRequestInterceptor implements HttpInterceptor {
    private count: number = 0;
    constructor(private spinner: Ng4LoadingSpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.count++;
        if (this.count == 1)
            this.spinner.show();

        if (request.headers.has(skipTokenHeader)) {
            return next.handle(request);
        }
        else {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    // Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`
                }
            });
        }
        // return next.handle(request).pipe(
        //     finalize(() => this.spinner.hide())
        // );
        return next.handle(request).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        this.count--;
                        if (this.count == 0){
                            console.log("this.count---",this.count)
                            this.spinner.hide()
                        }
                    }
                },
                error => {
                    this.count--;
                    if (this.count == 0) this.spinner.hide();
                    if (event instanceof HttpResponse) {
                    }
                }
            )
        );
    }

}