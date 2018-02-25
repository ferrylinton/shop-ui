import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopSharedModule } from '../../shared';
import {
    LogDataService,
    LogDataPopupService,
    LogDataComponent,
    LogDataDetailComponent,
    LogDataDialogComponent,
    LogDataPopupComponent,
    LogDataDeletePopupComponent,
    LogDataDeleteDialogComponent,
    logDataRoute,
    logDataPopupRoute,
    LogDataResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...logDataRoute,
    ...logDataPopupRoute,
];

@NgModule({
    imports: [
        ShopSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LogDataComponent,
        LogDataDetailComponent,
        LogDataDialogComponent,
        LogDataDeleteDialogComponent,
        LogDataPopupComponent,
        LogDataDeletePopupComponent,
    ],
    entryComponents: [
        LogDataComponent,
        LogDataDialogComponent,
        LogDataPopupComponent,
        LogDataDeleteDialogComponent,
        LogDataDeletePopupComponent,
    ],
    providers: [
        LogDataService,
        LogDataPopupService,
        LogDataResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopLogDataModule {}
