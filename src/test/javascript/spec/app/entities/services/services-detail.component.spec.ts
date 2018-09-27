/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ServiceAppTestModule } from '../../../test.module';
import { ServicesDetailComponent } from '../../../../../../main/webapp/app/entities/services/services-detail.component';
import { ServicesService } from '../../../../../../main/webapp/app/entities/services/services.service';
import { Services } from '../../../../../../main/webapp/app/entities/services/services.model';

describe('Component Tests', () => {

    describe('Services Management Detail Component', () => {
        let comp: ServicesDetailComponent;
        let fixture: ComponentFixture<ServicesDetailComponent>;
        let service: ServicesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ServiceAppTestModule],
                declarations: [ServicesDetailComponent],
                providers: [
                    ServicesService
                ]
            })
            .overrideTemplate(ServicesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServicesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Services(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.services).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
