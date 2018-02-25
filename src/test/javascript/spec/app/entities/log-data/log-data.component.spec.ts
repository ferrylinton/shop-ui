/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ShopTestModule } from '../../../test.module';
import { LogDataComponent } from '../../../../../../main/webapp/app/entities/log-data/log-data.component';
import { LogDataService } from '../../../../../../main/webapp/app/entities/log-data/log-data.service';
import { LogData } from '../../../../../../main/webapp/app/entities/log-data/log-data.model';

describe('Component Tests', () => {

    describe('LogData Management Component', () => {
        let comp: LogDataComponent;
        let fixture: ComponentFixture<LogDataComponent>;
        let service: LogDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ShopTestModule],
                declarations: [LogDataComponent],
                providers: [
                    LogDataService
                ]
            })
            .overrideTemplate(LogDataComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LogDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LogDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LogData(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.logData[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
