import { Route } from '@angular/router';

import { MstMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
    path: 'mst-metrics',
    component: MstMetricsMonitoringComponent,
    data: {
        pageTitle: 'metrics.title'
    }
};
