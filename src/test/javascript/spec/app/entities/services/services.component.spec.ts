/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiceAppTestModule } from '../../../test.module';
import { ServicesComponent } from '../../../../../../main/webapp/app/entities/services/services.component';
import { ServicesService } from '../../../../../../main/webapp/app/entities/services/services.service';
import { Services } from '../../../../../../main/webapp/app/entities/services/services.model';

describe('Component Tests', () => {

    describe('Services Management Component', () => {
        let comp: ServicesComponent;
        let fixture: ComponentFixture<ServicesComponent>;
        let service: ServicesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ServiceAppTestModule],
                declarations: [ServicesComponent],
                providers: [
                    ServicesService
                ]
            })
            .overrideTemplate(ServicesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServicesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Services(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.services[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
