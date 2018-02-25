import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LogData } from './log-data.model';
import { LogDataPopupService } from './log-data-popup.service';
import { LogDataService } from './log-data.service';

@Component({
    selector: 'mst-log-data-delete-dialog',
    templateUrl: './log-data-delete-dialog.component.html'
})
export class LogDataDeleteDialogComponent {

    logData: LogData;

    constructor(
        private logDataService: LogDataService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.logDataService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'logDataListModification',
                content: 'Deleted an logData'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'mst-log-data-delete-popup',
    template: ''
})
export class LogDataDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private logDataPopupService: LogDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.logDataPopupService
                .open(LogDataDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
