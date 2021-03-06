import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Cart } from './cart.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Cart>;

@Injectable()
export class CartService {

    private resourceUrl =  SERVER_API_URL + 'api/carts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cart: Cart): Observable<EntityResponseType> {
        const copy = this.convert(cart);
        return this.http.post<Cart>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cart: Cart): Observable<EntityResponseType> {
        const copy = this.convert(cart);
        return this.http.put<Cart>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Cart>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Cart[]>> {
        const options = createRequestOption(req);
        return this.http.get<Cart[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Cart[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Cart = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Cart[]>): HttpResponse<Cart[]> {
        const jsonResponse: Cart[] = res.body;
        const body: Cart[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Cart.
     */
    private convertItemFromServer(cart: Cart): Cart {
        const copy: Cart = Object.assign({}, cart);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(cart.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(cart.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a Cart to a JSON which can be sent to the server.
     */
    private convert(cart: Cart): Cart {
        const copy: Cart = Object.assign({}, cart);

        copy.createdDate = this.dateUtils.toDate(cart.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(cart.lastModifiedDate);
        return copy;
    }
}
