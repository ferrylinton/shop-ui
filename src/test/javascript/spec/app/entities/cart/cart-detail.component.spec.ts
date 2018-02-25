/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShopTestModule } from '../../../test.module';
import { CartDetailComponent } from '../../../../../../main/webapp/app/entities/cart/cart-detail.component';
import { CartService } from '../../../../../../main/webapp/app/entities/cart/cart.service';
import { Cart } from '../../../../../../main/webapp/app/entities/cart/cart.model';

describe('Component Tests', () => {

    describe('Cart Management Detail Component', () => {
        let comp: CartDetailComponent;
        let fixture: ComponentFixture<CartDetailComponent>;
        let service: CartService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopTestModule],
                declarations: [CartDetailComponent],
                providers: [
                    CartService
                ]
            })
            .overrideTemplate(CartDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CartDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CartService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Cart(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cart).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
