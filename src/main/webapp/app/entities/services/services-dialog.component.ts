import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Services } from './services.model';
import { ServicesPopupService } from './services-popup.service';
import { ServicesService } from './services.service';
import { ServiceInformation, ServiceInformationService } from '../service-information';

@Component({
    selector: 'jhi-services-dialog',
    templateUrl: './services-dialog.component.html'
})
export class ServicesDialogComponent implements OnInit {

    services: Services;
    isSaving: boolean;

    serviceinformations: ServiceInformation[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private servicesService: ServicesService,
        private serviceInformationService: ServiceInformationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.serviceInformationService
            .query({filter: 'services-is-null'})
            .subscribe((res: HttpResponse<ServiceInformation[]>) => {
                if (!this.services.serviceInformation || !this.services.serviceInformation.id) {
                    this.serviceinformations = res.body;
                } else {
                    this.serviceInformationService
                        .find(this.services.serviceInformation.id)
                        .subscribe((subRes: HttpResponse<ServiceInformation>) => {
                            this.serviceinformations = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.services.id !== undefined) {
            this.subscribeToSaveResponse(
                this.servicesService.update(this.services));
        } else {
            this.subscribeToSaveResponse(
                this.servicesService.create(this.services));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Services>>) {
        result.subscribe((res: HttpResponse<Services>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Services) {
        this.eventManager.broadcast({ name: 'servicesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackServiceInformationById(index: number, item: ServiceInformation) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-services-popup',
    template: ''
})
export class ServicesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servicesPopupService: ServicesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.servicesPopupService
                    .open(ServicesDialogComponent as Component, params['id']);
            } else {
                this.servicesPopupService
                    .open(ServicesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
