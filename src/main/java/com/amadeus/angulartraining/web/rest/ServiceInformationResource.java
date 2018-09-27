package com.amadeus.angulartraining.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.amadeus.angulartraining.domain.ServiceInformation;

import com.amadeus.angulartraining.repository.ServiceInformationRepository;
import com.amadeus.angulartraining.web.rest.errors.BadRequestAlertException;
import com.amadeus.angulartraining.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ServiceInformation.
 */
@RestController
@RequestMapping("/api")
public class ServiceInformationResource {

    private final Logger log = LoggerFactory.getLogger(ServiceInformationResource.class);

    private static final String ENTITY_NAME = "serviceInformation";

    private final ServiceInformationRepository serviceInformationRepository;

    public ServiceInformationResource(ServiceInformationRepository serviceInformationRepository) {
        this.serviceInformationRepository = serviceInformationRepository;
    }

    /**
     * POST  /service-informations : Create a new serviceInformation.
     *
     * @param serviceInformation the serviceInformation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new serviceInformation, or with status 400 (Bad Request) if the serviceInformation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/service-informations")
    @Timed
    public ResponseEntity<ServiceInformation> createServiceInformation(@RequestBody ServiceInformation serviceInformation) throws URISyntaxException {
        log.debug("REST request to save ServiceInformation : {}", serviceInformation);
        if (serviceInformation.getId() != null) {
            throw new BadRequestAlertException("A new serviceInformation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceInformation result = serviceInformationRepository.save(serviceInformation);
        return ResponseEntity.created(new URI("/api/service-informations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /service-informations : Updates an existing serviceInformation.
     *
     * @param serviceInformation the serviceInformation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated serviceInformation,
     * or with status 400 (Bad Request) if the serviceInformation is not valid,
     * or with status 500 (Internal Server Error) if the serviceInformation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/service-informations")
    @Timed
    public ResponseEntity<ServiceInformation> updateServiceInformation(@RequestBody ServiceInformation serviceInformation) throws URISyntaxException {
        log.debug("REST request to update ServiceInformation : {}", serviceInformation);
        if (serviceInformation.getId() == null) {
            return createServiceInformation(serviceInformation);
        }
        ServiceInformation result = serviceInformationRepository.save(serviceInformation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, serviceInformation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /service-informations : get all the serviceInformations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of serviceInformations in body
     */
    @GetMapping("/service-informations")
    @Timed
    public List<ServiceInformation> getAllServiceInformations() {
        log.debug("REST request to get all ServiceInformations");
        return serviceInformationRepository.findAll();
        }

    /**
     * GET  /service-informations/:id : get the "id" serviceInformation.
     *
     * @param id the id of the serviceInformation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the serviceInformation, or with status 404 (Not Found)
     */
    @GetMapping("/service-informations/{id}")
    @Timed
    public ResponseEntity<ServiceInformation> getServiceInformation(@PathVariable Long id) {
        log.debug("REST request to get ServiceInformation : {}", id);
        ServiceInformation serviceInformation = serviceInformationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(serviceInformation));
    }

    /**
     * DELETE  /service-informations/:id : delete the "id" serviceInformation.
     *
     * @param id the id of the serviceInformation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/service-informations/{id}")
    @Timed
    public ResponseEntity<Void> deleteServiceInformation(@PathVariable Long id) {
        log.debug("REST request to delete ServiceInformation : {}", id);
        serviceInformationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
