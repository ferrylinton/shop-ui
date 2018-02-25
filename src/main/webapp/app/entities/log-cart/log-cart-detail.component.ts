import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { LogCart } from './log-cart.model';
import { LogCartService } from './log-cart.service';

@Component({
    selector: 'mst-log-cart-detail',
    templateUrl: './log-cart-detail.component.html'
})
export class LogCartDetailComponent implements OnInit, OnDestroy {

    logCart: LogCart;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private logCartService: LogCartService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLogCarts();
    }

    load(id) {
        this.logCartService.find(id)
            .subscribe((logCartResponse: HttpResponse<LogCart>) => {
                this.logCart = logCartResponse.body;
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

    registerChangeInLogCarts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'logCartListModification',
            (response) => this.load(this.logCart.id)
        );
    }
}
