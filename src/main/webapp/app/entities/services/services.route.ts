import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ServicesComponent } from './services.component';
import { ServicesDetailComponent } from './services-detail.component';
import { ServicesPopupComponent } from './services-dialog.component';
import { ServicesDeletePopupComponent } from './services-delete-dialog.component';

export const servicesRoute: Routes = [
    {
        path: 'services',
        component: ServicesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serviceApp.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'services/:id',
        component: ServicesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serviceApp.services.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servicesPopupRoute: Routes = [
    {
        path: 'services-new',
        component: ServicesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serviceApp.services.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'services/:id/edit',
        component: ServicesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serviceApp.services.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'services/:id/delete',
        component: ServicesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'serviceApp.services.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
