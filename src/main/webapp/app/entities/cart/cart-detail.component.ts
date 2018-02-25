import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Cart } from './cart.model';
import { CartService } from './cart.service';

@Component({
    selector: 'mst-cart-detail',
    templateUrl: './cart-detail.component.html'
})
export class CartDetailComponent implements OnInit, OnDestroy {

    cart: Cart;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cartService: CartService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCarts();
    }

    load(id) {
        this.cartService.find(id)
            .subscribe((cartResponse: HttpResponse<Cart>) => {
                this.cart = cartResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCarts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cartListModification',
            (response) => this.load(this.cart.id)
        );
    }
}
