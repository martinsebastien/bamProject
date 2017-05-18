import { Http, RequestOptions, RequestOptionsArgs, Response, RequestMethod, Request } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

export { Response, RequestOptionsArgs }

//Http service to add options to http verbs
@Injectable()
export class HttpService {

    private base = 'http://localhost:3000/'

    constructor(
        private http: Http,
    ) {}

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Get, url, null, options)
    }

    public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Post, url, body, options)
    }

    public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Put, url, body, options)
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Delete, url, null, options)
    }

    public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Patch, url, body, options)
    }

    public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.request(RequestMethod.Head, url, null, options)
    }

    private request(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Observable<Response> {
        let requestOptions = new RequestOptions(Object.assign({ method, body, url: this.buildUrl(url)}, options))

        return this.http.request(new Request(requestOptions))
    }

    private buildUrl(endpoint: string): string {
        return this.base + endpoint
    }
}