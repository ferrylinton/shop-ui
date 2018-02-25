/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ShopTestModule } from '../../../test.module';
import { LogDataDetailComponent } from '../../../../../../main/webapp/app/entities/log-data/log-data-detail.component';
import { LogDataService } from '../../../../../../main/webapp/app/entities/log-data/log-data.service';
import { LogData } from '../../../../../../main/webapp/app/entities/log-data/log-data.model';

describe('Component Tests', () => {

    describe('LogData Management Detail Component', () => {
        let comp: LogDataDetailComponent;
        let fixture: ComponentFixture<LogDataDetailComponent>;
        let service: LogDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopTestModule],
                declarations: [LogDataDetailComponent],
                providers: [
                    LogDataService
                ]
            })
            .overrideTemplate(LogDataDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LogDataDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LogDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LogData(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.logData).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
