import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopSharedModule } from '../../shared';
import {
    CartService,
    CartPopupService,
    CartComponent,
    CartDetailComponent,
    CartDialogComponent,
    CartPopupComponent,
    CartDeletePopupComponent,
    CartDeleteDialogComponent,
    cartRoute,
    cartPopupRoute,
    CartResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cartRoute,
    ...cartPopupRoute,
];

@NgModule({
    imports: [
        ShopSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CartComponent,
        CartDetailComponent,
        CartDialogComponent,
        CartDeleteDialogComponent,
        CartPopupComponent,
        CartDeletePopupComponent,
    ],
    entryComponents: [
        CartComponent,
        CartDialogComponent,
        CartPopupComponent,
        CartDeleteDialogComponent,
        CartDeletePopupComponent,
    ],
    providers: [
        CartService,
        CartPopupService,
        CartResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopCartModule {}
