import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LogCart } from './log-cart.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LogCart>;

@Injectable()
export class LogCartService {

    private resourceUrl =  SERVER_API_URL + 'api/log-carts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(logCart: LogCart): Observable<EntityResponseType> {
        const copy = this.convert(logCart);
        return this.http.post<LogCart>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(logCart: LogCart): Observable<EntityResponseType> {
        const copy = this.convert(logCart);
        return this.http.put<LogCart>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LogCart>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LogCart[]>> {
        const options = createRequestOption(req);
        return this.http.get<LogCart[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LogCart[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LogCart = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LogCart[]>): HttpResponse<LogCart[]> {
        const jsonResponse: LogCart[] = res.body;
        const body: LogCart[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LogCart.
     */
    private convertItemFromServer(logCart: LogCart): LogCart {
        const copy: LogCart = Object.assign({}, logCart);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(logCart.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(logCart.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a LogCart to a JSON which can be sent to the server.
     */
    private convert(logCart: LogCart): LogCart {
        const copy: LogCart = Object.assign({}, logCart);

        copy.createdDate = this.dateUtils.toDate(logCart.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(logCart.lastModifiedDate);
        return copy;
    }
}
