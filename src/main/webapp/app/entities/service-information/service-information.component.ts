import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ServiceInformation } from './service-information.model';
import { ServiceInformationService } from './service-information.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-service-information',
    templateUrl: './service-information.component.html'
})
export class ServiceInformationComponent implements OnInit, OnDestroy {
serviceInformations: ServiceInformation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private serviceInformationService: ServiceInformationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.serviceInformationService.query().subscribe(
            (res: HttpResponse<ServiceInformation[]>) => {
                this.serviceInformations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInServiceInformations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ServiceInformation) {
        return item.id;
    }
    registerChangeInServiceInformations() {
        this.eventSubscriber = this.eventManager.subscribe('serviceInformationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
