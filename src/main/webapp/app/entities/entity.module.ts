import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ShopCategoryModule } from './category/category.module';
import { ShopProductModule } from './product/product.module';
import { ShopCartModule } from './cart/cart.module';
import { ShopItemModule } from './item/item.module';
import { ShopLogDataModule } from './log-data/log-data.module';
import { ShopLogCartModule } from './log-cart/log-cart.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ShopCategoryModule,
        ShopProductModule,
        ShopCartModule,
        ShopItemModule,
        ShopLogDataModule,
        ShopLogCartModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopEntityModule {}
