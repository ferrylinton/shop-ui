import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopSharedModule } from '../shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
    adminState,
    AuditsComponent,
    UserMgmtComponent,
    UserDialogComponent,
    UserDeleteDialogComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    MstMetricsMonitoringModalComponent,
    MstMetricsMonitoringComponent,
    MstHealthModalComponent,
    MstHealthCheckComponent,
    MstConfigurationComponent,
    MstDocsComponent,
    AuditsService,
    MstConfigurationService,
    MstHealthService,
    MstMetricsService,
    LogsService,
    UserResolvePagingParams,
    UserResolve,
    UserModalService
} from './';

@NgModule({
    imports: [
        ShopSharedModule,
        RouterModule.forChild(adminState),
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        AuditsComponent,
        UserMgmtComponent,
        UserDialogComponent,
        UserDeleteDialogComponent,
        UserMgmtDetailComponent,
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        LogsComponent,
        MstConfigurationComponent,
        MstHealthCheckComponent,
        MstHealthModalComponent,
        MstDocsComponent,
        MstMetricsMonitoringComponent,
        MstMetricsMonitoringModalComponent
    ],
    entryComponents: [
        UserMgmtDialogComponent,
        UserMgmtDeleteDialogComponent,
        MstHealthModalComponent,
        MstMetricsMonitoringModalComponent,
    ],
    providers: [
        AuditsService,
        MstConfigurationService,
        MstHealthService,
        MstMetricsService,
        LogsService,
        UserResolvePagingParams,
        UserResolve,
        UserModalService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShopAdminModule {}
