import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { LogData } from './log-data.model';
import { LogDataService } from './log-data.service';

@Component({
    selector: 'mst-log-data-detail',
    templateUrl: './log-data-detail.component.html'
})
export class LogDataDetailComponent implements OnInit, OnDestroy {

    logData: LogData;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private logDataService: LogDataService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLogData();
    }

    load(id) {
        this.logDataService.find(id)
            .subscribe((logDataResponse: HttpResponse<LogData>) => {
                this.logData = logDataResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLogData() {
        this.eventSubscriber = this.eventManager.subscribe(
            'logDataListModification',
            (response) => this.load(this.logData.id)
        );
    }
}
