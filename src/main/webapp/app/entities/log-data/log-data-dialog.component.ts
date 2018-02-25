import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { LogData } from './log-data.model';
import { LogDataPopupService } from './log-data-popup.service';
import { LogDataService } from './log-data.service';

@Component({
    selector: 'mst-log-data-dialog',
    templateUrl: './log-data-dialog.component.html'
})
export class LogDataDialogComponent implements OnInit {

    logData: LogData;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private logDataService: LogDataService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.logData.id !== undefined) {
            this.subscribeToSaveResponse(
                this.logDataService.update(this.logData));
        } else {
            this.subscribeToSaveResponse(
                this.logDataService.create(this.logData));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LogData>>) {
        result.subscribe((res: HttpResponse<LogData>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LogData) {
        this.eventManager.broadcast({ name: 'logDataListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'mst-log-data-popup',
    template: ''
})
export class LogDataPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private logDataPopupService: LogDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.logDataPopupService
                    .open(LogDataDialogComponent as Component, params['id']);
            } else {
                this.logDataPopupService
                    .open(LogDataDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
