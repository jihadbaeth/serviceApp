import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiceAppSharedModule } from '../../shared';
import {
    ServiceInformationService,
    ServiceInformationPopupService,
    ServiceInformationComponent,
    ServiceInformationDetailComponent,
    ServiceInformationDialogComponent,
    ServiceInformationPopupComponent,
    ServiceInformationDeletePopupComponent,
    ServiceInformationDeleteDialogComponent,
    serviceInformationRoute,
    serviceInformationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...serviceInformationRoute,
    ...serviceInformationPopupRoute,
];

@NgModule({
    imports: [
        ServiceAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServiceInformationComponent,
        ServiceInformationDetailComponent,
        ServiceInformationDialogComponent,
        ServiceInformationDeleteDialogComponent,
        ServiceInformationPopupComponent,
        ServiceInformationDeletePopupComponent,
    ],
    entryComponents: [
        ServiceInformationComponent,
        ServiceInformationDialogComponent,
        ServiceInformationPopupComponent,
        ServiceInformationDeleteDialogComponent,
        ServiceInformationDeletePopupComponent,
    ],
    providers: [
        ServiceInformationService,
        ServiceInformationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiceAppServiceInformationModule {}
