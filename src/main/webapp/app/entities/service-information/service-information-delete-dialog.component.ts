import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceInformation } from './service-information.model';
import { ServiceInformationPopupService } from './service-information-popup.service';
import { ServiceInformationService } from './service-information.service';

@Component({
    selector: 'jhi-service-information-delete-dialog',
    templateUrl: './service-information-delete-dialog.component.html'
})
export class ServiceInformationDeleteDialogComponent {

    serviceInformation: ServiceInformation;

    constructor(
        private serviceInformationService: ServiceInformationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceInformationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'serviceInformationListModification',
                content: 'Deleted an serviceInformation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-service-information-delete-popup',
    template: ''
})
export class ServiceInformationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceInformationPopupService: ServiceInformationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.serviceInformationPopupService
                .open(ServiceInformationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
