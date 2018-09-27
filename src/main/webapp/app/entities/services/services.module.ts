import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ServiceAppSharedModule } from '../../shared';
import {
    ServicesService,
    ServicesPopupService,
    ServicesComponent,
    ServicesDetailComponent,
    ServicesDialogComponent,
    ServicesPopupComponent,
    ServicesDeletePopupComponent,
    ServicesDeleteDialogComponent,
    servicesRoute,
    servicesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...servicesRoute,
    ...servicesPopupRoute,
];

@NgModule({
    imports: [
        ServiceAppSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServicesComponent,
        ServicesDetailComponent,
        ServicesDialogComponent,
        ServicesDeleteDialogComponent,
        ServicesPopupComponent,
        ServicesDeletePopupComponent,
    ],
    entryComponents: [
        ServicesComponent,
        ServicesDialogComponent,
        ServicesPopupComponent,
        ServicesDeleteDialogComponent,
        ServicesDeletePopupComponent,
    ],
    providers: [
        ServicesService,
        ServicesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiceAppServicesModule {}
