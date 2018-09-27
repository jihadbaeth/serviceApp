package com.amadeus.angulartraining.repository;

import com.amadeus.angulartraining.domain.ServiceInformation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ServiceInformation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceInformationRepository extends JpaRepository<ServiceInformation, Long> {

}
