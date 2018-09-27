import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Services } from './services.model';
import { ServicesService } from './services.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-services',
    templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit, OnDestroy {
services: Services[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private servicesService: ServicesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.servicesService.query().subscribe(
            (res: HttpResponse<Services[]>) => {
                this.services = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInServices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Services) {
        return item.id;
    }
    registerChangeInServices() {
        this.eventSubscriber = this.eventManager.subscribe('servicesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
