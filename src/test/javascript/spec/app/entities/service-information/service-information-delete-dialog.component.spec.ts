/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceAppTestModule } from '../../../test.module';
import { ServiceInformationDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/service-information/service-information-delete-dialog.component';
import { ServiceInformationService } from '../../../../../../main/webapp/app/entities/service-information/service-information.service';

describe('Component Tests', () => {

    describe('ServiceInformation Management Delete Component', () => {
        let comp: ServiceInformationDeleteDialogComponent;
        let fixture: ComponentFixture<ServiceInformationDeleteDialogComponent>;
        let service: ServiceInformationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ServiceAppTestModule],
                declarations: [ServiceInformationDeleteDialogComponent],
                providers: [
                    ServiceInformationService
                ]
            })
            .overrideTemplate(ServiceInformationDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServiceInformationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServiceInformationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
