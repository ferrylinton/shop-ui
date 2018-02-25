import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { LogData } from './log-data.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LogData>;

@Injectable()
export class LogDataService {

    private resourceUrl =  SERVER_API_URL + 'api/log-data';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(logData: LogData): Observable<EntityResponseType> {
        const copy = this.convert(logData);
        return this.http.post<LogData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(logData: LogData): Observable<EntityResponseType> {
        const copy = this.convert(logData);
        return this.http.put<LogData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LogData>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LogData[]>> {
        const options = createRequestOption(req);
        return this.http.get<LogData[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LogData[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LogData = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LogData[]>): HttpResponse<LogData[]> {
        const jsonResponse: LogData[] = res.body;
        const body: LogData[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LogData.
     */
    private convertItemFromServer(logData: LogData): LogData {
        const copy: LogData = Object.assign({}, logData);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(logData.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(logData.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a LogData to a JSON which can be sent to the server.
     */
    private convert(logData: LogData): LogData {
        const copy: LogData = Object.assign({}, logData);

        copy.createdDate = this.dateUtils.toDate(logData.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(logData.lastModifiedDate);
        return copy;
    }
}
