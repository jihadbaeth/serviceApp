import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceInformation } from './service-information.model';
import { ServiceInformationService } from './service-information.service';

@Component({
    selector: 'jhi-service-information-detail',
    templateUrl: './service-information-detail.component.html'
})
export class ServiceInformationDetailComponent implements OnInit, OnDestroy {

    serviceInformation: ServiceInformation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private serviceInformationService: ServiceInformationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServiceInformations();
    }

    load(id) {
        this.serviceInformationService.find(id)
            .subscribe((serviceInformationResponse: HttpResponse<ServiceInformation>) => {
                this.serviceInformation = serviceInformationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServiceInformations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'serviceInformationListModification',
            (response) => this.load(this.serviceInformation.id)
        );
    }
}
