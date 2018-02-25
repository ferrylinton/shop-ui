import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopSharedModule } from '../../shared';
import {
    LogCartService,
    LogCartPopupService,
    LogCartComponent,
    LogCartDetailComponent,
    LogCartDialogComponent,
    LogCartPopupComponent,
    LogCartDeletePopupComponent,
    LogCartDeleteDialogComponent,
    logCartRoute,
    logCartPopupRoute,
    LogCartResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...logCartRoute,
    ...logCartPopupRoute,
];

@NgModule({
    imports: [
        ShopSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LogCartComponent,
        LogCartDetailComponent,
        LogCartDialogComponent,
        LogCartDeleteDialogComponent,
        LogCartPopupComponent,
        LogCartDeletePopupComponent,
    ],
    entryComponents: [
        LogCartComponent,
        LogCartDialogComponent,
        LogCartPopupComponent,
        LogCartDeleteDialogComponent,
        LogCartDeletePopupComponent,
    ],
    providers: [
        LogCartService,
        LogCartPopupService,
        LogCartResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopLogCartModule {}
