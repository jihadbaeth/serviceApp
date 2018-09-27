import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Services } from './services.model';
import { ServicesService } from './services.service';

@Component({
    selector: 'jhi-services-detail',
    templateUrl: './services-detail.component.html'
})
export class ServicesDetailComponent implements OnInit, OnDestroy {

    services: Services;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private servicesService: ServicesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServices();
    }

    load(id) {
        this.servicesService.find(id)
            .subscribe((servicesResponse: HttpResponse<Services>) => {
                this.services = servicesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'servicesListModification',
            (response) => this.load(this.services.id)
        );
    }
}
