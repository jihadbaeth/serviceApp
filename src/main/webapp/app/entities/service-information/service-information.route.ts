import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ServiceInformationComponent } from './service-information.component';
import { ServiceInformationDetailComponent } from './service-information-detail.component';
import { ServiceInformationPopupComponent } from './service-information-dialog.component';
import { ServiceInformationDeletePopupComponent } from './service-information-delete-dialog.component';

export const serviceInformationRoute: Routes = [
    {
        path: 'service-information',
        component: ServiceInformationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serviceApp.serviceInformation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'service-information/:id',
        component: ServiceInformationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serviceApp.serviceInformation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const serviceInformationPopupRoute: Routes = [
    {
        path: 'service-information-new',
        component: ServiceInformationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serviceApp.serviceInformation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-information/:id/edit',
        component: ServiceInformationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serviceApp.serviceInformation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'service-information/:id/delete',
        component: ServiceInformationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serviceApp.serviceInformation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
