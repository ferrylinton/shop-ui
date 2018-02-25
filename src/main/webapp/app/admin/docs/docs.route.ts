import { Route } from '@angular/router';

import { MstDocsComponent } from './docs.component';

export const docsRoute: Route = {
    path: 'docs',
    component: MstDocsComponent,
    data: {
        pageTitle: 'global.menu.admin.apidocs'
    }
};
