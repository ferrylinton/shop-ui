import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { LogCart } from './log-cart.model';
import { LogCartPopupService } from './log-cart-popup.service';
import { LogCartService } from './log-cart.service';

@Component({
    selector: 'mst-log-cart-dialog',
    templateUrl: './log-cart-dialog.component.html'
})
export class LogCartDialogComponent implements OnInit {

    logCart: LogCart;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private logCartService: LogCartService,
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
        if (this.logCart.id !== undefined) {
            this.subscribeToSaveResponse(
                this.logCartService.update(this.logCart));
        } else {
            this.subscribeToSaveResponse(
                this.logCartService.create(this.logCart));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LogCart>>) {
        result.subscribe((res: HttpResponse<LogCart>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LogCart) {
        this.eventManager.broadcast({ name: 'logCartListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'mst-log-cart-popup',
    template: ''
})
export class LogCartPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private logCartPopupService: LogCartPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.logCartPopupService
                    .open(LogCartDialogComponent as Component, params['id']);
            } else {
                this.logCartPopupService
                    .open(LogCartDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
