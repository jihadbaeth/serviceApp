package com.amadeus.angulartraining.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.amadeus.angulartraining.domain.Services;

import com.amadeus.angulartraining.repository.ServicesRepository;
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
 * REST controller for managing Services.
 */
@RestController
@RequestMapping("/api")
public class ServicesResource {

    private final Logger log = LoggerFactory.getLogger(ServicesResource.class);

    private static final String ENTITY_NAME = "services";

    private final ServicesRepository servicesRepository;

    public ServicesResource(ServicesRepository servicesRepository) {
        this.servicesRepository = servicesRepository;
    }

    /**
     * POST  /services : Create a new services.
     *
     * @param services the services to create
     * @return the ResponseEntity with status 201 (Created) and with body the new services, or with status 400 (Bad Request) if the services has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/services")
    @Timed
    public ResponseEntity<Services> createServices(@RequestBody Services services) throws URISyntaxException {
        log.debug("REST request to save Services : {}", services);
        if (services.getId() != null) {
            throw new BadRequestAlertException("A new services cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Services result = servicesRepository.save(services);
        return ResponseEntity.created(new URI("/api/services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /services : Updates an existing services.
     *
     * @param services the services to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated services,
     * or with status 400 (Bad Request) if the services is not valid,
     * or with status 500 (Internal Server Error) if the services couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/services")
    @Timed
    public ResponseEntity<Services> updateServices(@RequestBody Services services) throws URISyntaxException {
        log.debug("REST request to update Services : {}", services);
        if (services.getId() == null) {
            return createServices(services);
        }
        Services result = servicesRepository.save(services);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, services.getId().toString()))
            .body(result);
    }

    /**
     * GET  /services : get all the services.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of services in body
     */
    @GetMapping("/services")
    @Timed
    public List<Services> getAllServices() {
        log.debug("REST request to get all Services");
        return servicesRepository.findAll();
        }

    /**
     * GET  /services/:id : get the "id" services.
     *
     * @param id the id of the services to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the services, or with status 404 (Not Found)
     */
    @GetMapping("/services/{id}")
    @Timed
    public ResponseEntity<Services> getServices(@PathVariable Long id) {
        log.debug("REST request to get Services : {}", id);
        Services services = servicesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(services));
    }

    /**
     * DELETE  /services/:id : delete the "id" services.
     *
     * @param id the id of the services to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/services/{id}")
    @Timed
    public ResponseEntity<Void> deleteServices(@PathVariable Long id) {
        log.debug("REST request to delete Services : {}", id);
        servicesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
