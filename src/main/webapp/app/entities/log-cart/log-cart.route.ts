import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LogCartComponent } from './log-cart.component';
import { LogCartDetailComponent } from './log-cart-detail.component';
import { LogCartPopupComponent } from './log-cart-dialog.component';
import { LogCartDeletePopupComponent } from './log-cart-delete-dialog.component';

@Injectable()
export class LogCartResolvePagingParams implements Resolve<any> {

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

export const logCartRoute: Routes = [
    {
        path: 'log-cart',
        component: LogCartComponent,
        resolve: {
            'pagingParams': LogCartResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopApp.logCart.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'log-cart/:id',
        component: LogCartDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopApp.logCart.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const logCartPopupRoute: Routes = [
    {
        path: 'log-cart-new',
        component: LogCartPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopApp.logCart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'log-cart/:id/edit',
        component: LogCartPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopApp.logCart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'log-cart/:id/delete',
        component: LogCartDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'shopApp.logCart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
