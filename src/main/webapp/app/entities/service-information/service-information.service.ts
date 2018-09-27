import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ServiceInformation } from './service-information.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ServiceInformation>;

@Injectable()
export class ServiceInformationService {

    private resourceUrl =  SERVER_API_URL + 'api/service-informations';

    constructor(private http: HttpClient) { }

    create(serviceInformation: ServiceInformation): Observable<EntityResponseType> {
        const copy = this.convert(serviceInformation);
        return this.http.post<ServiceInformation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(serviceInformation: ServiceInformation): Observable<EntityResponseType> {
        const copy = this.convert(serviceInformation);
        return this.http.put<ServiceInformation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ServiceInformation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ServiceInformation[]>> {
        const options = createRequestOption(req);
        return this.http.get<ServiceInformation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ServiceInformation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ServiceInformation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ServiceInformation[]>): HttpResponse<ServiceInformation[]> {
        const jsonResponse: ServiceInformation[] = res.body;
        const body: ServiceInformation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ServiceInformation.
     */
    private convertItemFromServer(serviceInformation: ServiceInformation): ServiceInformation {
        const copy: ServiceInformation = Object.assign({}, serviceInformation);
        return copy;
    }

    /**
     * Convert a ServiceInformation to a JSON which can be sent to the server.
     */
    private convert(serviceInformation: ServiceInformation): ServiceInformation {
        const copy: ServiceInformation = Object.assign({}, serviceInformation);
        return copy;
    }
}
