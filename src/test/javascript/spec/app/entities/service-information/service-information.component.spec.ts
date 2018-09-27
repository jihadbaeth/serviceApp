/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ServiceAppTestModule } from '../../../test.module';
import { ServiceInformationComponent } from '../../../../../../main/webapp/app/entities/service-information/service-information.component';
import { ServiceInformationService } from '../../../../../../main/webapp/app/entities/service-information/service-information.service';
import { ServiceInformation } from '../../../../../../main/webapp/app/entities/service-information/service-information.model';

describe('Component Tests', () => {

    describe('ServiceInformation Management Component', () => {
        let comp: ServiceInformationComponent;
        let fixture: ComponentFixture<ServiceInformationComponent>;
        let service: ServiceInformationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ServiceAppTestModule],
                declarations: [ServiceInformationComponent],
                providers: [
                    ServiceInformationService
                ]
            })
            .overrideTemplate(ServiceInformationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceInformationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceInformationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ServiceInformation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.serviceInformations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
