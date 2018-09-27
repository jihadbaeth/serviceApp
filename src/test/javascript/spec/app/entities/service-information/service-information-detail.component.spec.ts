/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ServiceAppTestModule } from '../../../test.module';
import { ServiceInformationDetailComponent } from '../../../../../../main/webapp/app/entities/service-information/service-information-detail.component';
import { ServiceInformationService } from '../../../../../../main/webapp/app/entities/service-information/service-information.service';
import { ServiceInformation } from '../../../../../../main/webapp/app/entities/service-information/service-information.model';

describe('Component Tests', () => {

    describe('ServiceInformation Management Detail Component', () => {
        let comp: ServiceInformationDetailComponent;
        let fixture: ComponentFixture<ServiceInformationDetailComponent>;
        let service: ServiceInformationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ServiceAppTestModule],
                declarations: [ServiceInformationDetailComponent],
                providers: [
                    ServiceInformationService
                ]
            })
            .overrideTemplate(ServiceInformationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceInformationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceInformationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ServiceInformation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.serviceInformation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
