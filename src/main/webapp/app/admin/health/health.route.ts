import { Route } from '@angular/router';

import { MstHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
    path: 'mst-health',
    component: MstHealthCheckComponent,
    data: {
        pageTitle: 'health.title'
    }
};
