import { Route } from '@angular/router';

import { MstConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
    path: 'mst-configuration',
    component: MstConfigurationComponent,
    data: {
        pageTitle: 'configuration.title'
    }
};
