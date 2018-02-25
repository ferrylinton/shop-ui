import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/id';

import {
    ShopSharedLibsModule,
    JhiLanguageHelper,
    FindLanguageFromKeyPipe,
    MstAlertComponent,
    MstAlertErrorComponent
} from './';

@NgModule({
    imports: [
        ShopSharedLibsModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        MstAlertComponent,
        MstAlertErrorComponent
    ],
    providers: [
        JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'id'
        },
    ],
    exports: [
        ShopSharedLibsModule,
        FindLanguageFromKeyPipe,
        MstAlertComponent,
        MstAlertErrorComponent
    ]
})
export class ShopSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
