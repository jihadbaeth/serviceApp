import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Services } from './services.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Services>;

@Injectable()
export class ServicesService {

    private resourceUrl =  SERVER_API_URL + 'api/services';

    constructor(private http: HttpClient) { }

    create(services: Services): Observable<EntityResponseType> {
        const copy = this.convert(services);
        return this.http.post<Services>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(services: Services): Observable<EntityResponseType> {
        const copy = this.convert(services);
        return this.http.put<Services>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Services>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Services[]>> {
        const options = createRequestOption(req);
        return this.http.get<Services[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Services[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Services = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Services[]>): HttpResponse<Services[]> {
        const jsonResponse: Services[] = res.body;
        const body: Services[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Services.
     */
    private convertItemFromServer(services: Services): Services {
        const copy: Services = Object.assign({}, services);
        return copy;
    }

    /**
     * Convert a Services to a JSON which can be sent to the server.
     */
    private convert(services: Services): Services {
        const copy: Services = Object.assign({}, services);
        return copy;
    }
}
