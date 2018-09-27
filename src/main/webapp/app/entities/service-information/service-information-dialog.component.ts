import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceInformation } from './service-information.model';
import { ServiceInformationPopupService } from './service-information-popup.service';
import { ServiceInformationService } from './service-information.service';

@Component({
    selector: 'jhi-service-information-dialog',
    templateUrl: './service-information-dialog.component.html'
})
export class ServiceInformationDialogComponent implements OnInit {

    serviceInformation: ServiceInformation;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private serviceInformationService: ServiceInformationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.serviceInformation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.serviceInformationService.update(this.serviceInformation));
        } else {
            this.subscribeToSaveResponse(
                this.serviceInformationService.create(this.serviceInformation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ServiceInformation>>) {
        result.subscribe((res: HttpResponse<ServiceInformation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ServiceInformation) {
        this.eventManager.broadcast({ name: 'serviceInformationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-service-information-popup',
    template: ''
})
export class ServiceInformationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceInformationPopupService: ServiceInformationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.serviceInformationPopupService
                    .open(ServiceInformationDialogComponent as Component, params['id']);
            } else {
                this.serviceInformationPopupService
                    .open(ServiceInformationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
