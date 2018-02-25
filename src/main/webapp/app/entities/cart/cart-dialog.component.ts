import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cart } from './cart.model';
import { CartPopupService } from './cart-popup.service';
import { CartService } from './cart.service';

@Component({
    selector: 'mst-cart-dialog',
    templateUrl: './cart-dialog.component.html'
})
export class CartDialogComponent implements OnInit {

    cart: Cart;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cartService: CartService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cart.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cartService.update(this.cart));
        } else {
            this.subscribeToSaveResponse(
                this.cartService.create(this.cart));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Cart>>) {
        result.subscribe((res: HttpResponse<Cart>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Cart) {
        this.eventManager.broadcast({ name: 'cartListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'mst-cart-popup',
    template: ''
})
export class CartPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cartPopupService: CartPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cartPopupService
                    .open(CartDialogComponent as Component, params['id']);
            } else {
                this.cartPopupService
                    .open(CartDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
