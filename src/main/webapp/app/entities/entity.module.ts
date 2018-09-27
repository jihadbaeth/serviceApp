import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ServiceAppServicesModule } from './services/services.module';
import { ServiceAppServiceInformationModule } from './service-information/service-information.module';
import { ServiceAppContactModule } from './contact/contact.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ServiceAppServicesModule,
        ServiceAppServiceInformationModule,
        ServiceAppContactModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiceAppEntityModule {}
