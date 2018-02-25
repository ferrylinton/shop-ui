/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShopTestModule } from '../../../test.module';
import { LogCartComponent } from '../../../../../../main/webapp/app/entities/log-cart/log-cart.component';
import { LogCartService } from '../../../../../../main/webapp/app/entities/log-cart/log-cart.service';
import { LogCart } from '../../../../../../main/webapp/app/entities/log-cart/log-cart.model';

describe('Component Tests', () => {

    describe('LogCart Management Component', () => {
        let comp: LogCartComponent;
        let fixture: ComponentFixture<LogCartComponent>;
        let service: LogCartService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopTestModule],
                declarations: [LogCartComponent],
                providers: [
                    LogCartService
                ]
            })
            .overrideTemplate(LogCartComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LogCartComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LogCartService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LogCart(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.logCarts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
