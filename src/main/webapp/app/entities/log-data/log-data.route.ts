import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LogDataComponent } from './log-data.component';
import { LogDataDetailComponent } from './log-data-detail.component';
import { LogDataPopupComponent } from './log-data-dialog.component';
import { LogDataDeletePopupComponent } from './log-data-delete-dialog.component';

@Injectable()
export class LogDataResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const logDataRoute: Routes = [
    {
        path: 'log-data',
        component: LogDataComponent,
        resolve: {
            'pagingParams': LogDataResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopApp.logData.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'log-data/:id',
        component: LogDataDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopApp.logData.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const logDataPopupRoute: Routes = [
    {
        path: 'log-data-new',
        component: LogDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopApp.logData.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'log-data/:id/edit',
        component: LogDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopApp.logData.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'log-data/:id/delete',
        component: LogDataDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopApp.logData.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
