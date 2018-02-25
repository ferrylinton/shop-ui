/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShopTestModule } from '../../../test.module';
import { LogCartDetailComponent } from '../../../../../../main/webapp/app/entities/log-cart/log-cart-detail.component';
import { LogCartService } from '../../../../../../main/webapp/app/entities/log-cart/log-cart.service';
import { LogCart } from '../../../../../../main/webapp/app/entities/log-cart/log-cart.model';

describe('Component Tests', () => {

    describe('LogCart Management Detail Component', () => {
        let comp: LogCartDetailComponent;
        let fixture: ComponentFixture<LogCartDetailComponent>;
        let service: LogCartService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopTestModule],
                declarations: [LogCartDetailComponent],
                providers: [
                    LogCartService
                ]
            })
            .overrideTemplate(LogCartDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LogCartDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LogCartService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LogCart(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.logCart).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
