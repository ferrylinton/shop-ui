import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LogCart } from './log-cart.model';
import { LogCartPopupService } from './log-cart-popup.service';
import { LogCartService } from './log-cart.service';

@Component({
    selector: 'mst-log-cart-delete-dialog',
    templateUrl: './log-cart-delete-dialog.component.html'
})
export class LogCartDeleteDialogComponent {

    logCart: LogCart;

    constructor(
        private logCartService: LogCartService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.logCartService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'logCartListModification',
                content: 'Deleted an logCart'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'mst-log-cart-delete-popup',
    template: ''
})
export class LogCartDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private logCartPopupService: LogCartPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.logCartPopupService
                .open(LogCartDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
