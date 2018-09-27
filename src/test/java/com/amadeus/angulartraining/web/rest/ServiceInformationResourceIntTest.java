package com.amadeus.angulartraining.web.rest;

import com.amadeus.angulartraining.ServiceApp;

import com.amadeus.angulartraining.domain.ServiceInformation;
import com.amadeus.angulartraining.repository.ServiceInformationRepository;
import com.amadeus.angulartraining.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.amadeus.angulartraining.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ServiceInformationResource REST controller.
 *
 * @see ServiceInformationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ServiceApp.class)
public class ServiceInformationResourceIntTest {

    private static final String DEFAULT_PLATE = "AAAAAAAAAA";
    private static final String UPDATED_PLATE = "BBBBBBBBBB";

    private static final String DEFAULT_ROUTE = "AAAAAAAAAA";
    private static final String UPDATED_ROUTE = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVER_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DRIVER_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVER_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_DRIVER_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVER_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_DRIVER_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_CAR_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_CAR_MODEL = "BBBBBBBBBB";

    @Autowired
    private ServiceInformationRepository serviceInformationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restServiceInformationMockMvc;

    private ServiceInformation serviceInformation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServiceInformationResource serviceInformationResource = new ServiceInformationResource(serviceInformationRepository);
        this.restServiceInformationMockMvc = MockMvcBuilders.standaloneSetup(serviceInformationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceInformation createEntity(EntityManager em) {
        ServiceInformation serviceInformation = new ServiceInformation()
            .plate(DEFAULT_PLATE)
            .route(DEFAULT_ROUTE)
            .driverFirstName(DEFAULT_DRIVER_FIRST_NAME)
            .driverSurname(DEFAULT_DRIVER_SURNAME)
            .driverPhoneNumber(DEFAULT_DRIVER_PHONE_NUMBER)
            .carModel(DEFAULT_CAR_MODEL);
        return serviceInformation;
    }

    @Before
    public void initTest() {
        serviceInformation = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceInformation() throws Exception {
        int databaseSizeBeforeCreate = serviceInformationRepository.findAll().size();

        // Create the ServiceInformation
        restServiceInformationMockMvc.perform(post("/api/service-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceInformation)))
            .andExpect(status().isCreated());

        // Validate the ServiceInformation in the database
        List<ServiceInformation> serviceInformationList = serviceInformationRepository.findAll();
        assertThat(serviceInformationList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceInformation testServiceInformation = serviceInformationList.get(serviceInformationList.size() - 1);
        assertThat(testServiceInformation.getPlate()).isEqualTo(DEFAULT_PLATE);
        assertThat(testServiceInformation.getRoute()).isEqualTo(DEFAULT_ROUTE);
        assertThat(testServiceInformation.getDriverFirstName()).isEqualTo(DEFAULT_DRIVER_FIRST_NAME);
        assertThat(testServiceInformation.getDriverSurname()).isEqualTo(DEFAULT_DRIVER_SURNAME);
        assertThat(testServiceInformation.getDriverPhoneNumber()).isEqualTo(DEFAULT_DRIVER_PHONE_NUMBER);
        assertThat(testServiceInformation.getCarModel()).isEqualTo(DEFAULT_CAR_MODEL);
    }

    @Test
    @Transactional
    public void createServiceInformationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceInformationRepository.findAll().size();

        // Create the ServiceInformation with an existing ID
        serviceInformation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceInformationMockMvc.perform(post("/api/service-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceInformation)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceInformation in the database
        List<ServiceInformation> serviceInformationList = serviceInformationRepository.findAll();
        assertThat(serviceInformationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllServiceInformations() throws Exception {
        // Initialize the database
        serviceInformationRepository.saveAndFlush(serviceInformation);

        // Get all the serviceInformationList
        restServiceInformationMockMvc.perform(get("/api/service-informations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceInformation.getId().intValue())))
            .andExpect(jsonPath("$.[*].plate").value(hasItem(DEFAULT_PLATE.toString())))
            .andExpect(jsonPath("$.[*].route").value(hasItem(DEFAULT_ROUTE.toString())))
            .andExpect(jsonPath("$.[*].driverFirstName").value(hasItem(DEFAULT_DRIVER_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].driverSurname").value(hasItem(DEFAULT_DRIVER_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].driverPhoneNumber").value(hasItem(DEFAULT_DRIVER_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].carModel").value(hasItem(DEFAULT_CAR_MODEL.toString())));
    }

    @Test
    @Transactional
    public void getServiceInformation() throws Exception {
        // Initialize the database
        serviceInformationRepository.saveAndFlush(serviceInformation);

        // Get the serviceInformation
        restServiceInformationMockMvc.perform(get("/api/service-informations/{id}", serviceInformation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(serviceInformation.getId().intValue()))
            .andExpect(jsonPath("$.plate").value(DEFAULT_PLATE.toString()))
            .andExpect(jsonPath("$.route").value(DEFAULT_ROUTE.toString()))
            .andExpect(jsonPath("$.driverFirstName").value(DEFAULT_DRIVER_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.driverSurname").value(DEFAULT_DRIVER_SURNAME.toString()))
            .andExpect(jsonPath("$.driverPhoneNumber").value(DEFAULT_DRIVER_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.carModel").value(DEFAULT_CAR_MODEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceInformation() throws Exception {
        // Get the serviceInformation
        restServiceInformationMockMvc.perform(get("/api/service-informations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceInformation() throws Exception {
        // Initialize the database
        serviceInformationRepository.saveAndFlush(serviceInformation);
        int databaseSizeBeforeUpdate = serviceInformationRepository.findAll().size();

        // Update the serviceInformation
        ServiceInformation updatedServiceInformation = serviceInformationRepository.findOne(serviceInformation.getId());
        // Disconnect from session so that the updates on updatedServiceInformation are not directly saved in db
        em.detach(updatedServiceInformation);
        updatedServiceInformation
            .plate(UPDATED_PLATE)
            .route(UPDATED_ROUTE)
            .driverFirstName(UPDATED_DRIVER_FIRST_NAME)
            .driverSurname(UPDATED_DRIVER_SURNAME)
            .driverPhoneNumber(UPDATED_DRIVER_PHONE_NUMBER)
            .carModel(UPDATED_CAR_MODEL);

        restServiceInformationMockMvc.perform(put("/api/service-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedServiceInformation)))
            .andExpect(status().isOk());

        // Validate the ServiceInformation in the database
        List<ServiceInformation> serviceInformationList = serviceInformationRepository.findAll();
        assertThat(serviceInformationList).hasSize(databaseSizeBeforeUpdate);
        ServiceInformation testServiceInformation = serviceInformationList.get(serviceInformationList.size() - 1);
        assertThat(testServiceInformation.getPlate()).isEqualTo(UPDATED_PLATE);
        assertThat(testServiceInformation.getRoute()).isEqualTo(UPDATED_ROUTE);
        assertThat(testServiceInformation.getDriverFirstName()).isEqualTo(UPDATED_DRIVER_FIRST_NAME);
        assertThat(testServiceInformation.getDriverSurname()).isEqualTo(UPDATED_DRIVER_SURNAME);
        assertThat(testServiceInformation.getDriverPhoneNumber()).isEqualTo(UPDATED_DRIVER_PHONE_NUMBER);
        assertThat(testServiceInformation.getCarModel()).isEqualTo(UPDATED_CAR_MODEL);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceInformation() throws Exception {
        int databaseSizeBeforeUpdate = serviceInformationRepository.findAll().size();

        // Create the ServiceInformation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restServiceInformationMockMvc.perform(put("/api/service-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceInformation)))
            .andExpect(status().isCreated());

        // Validate the ServiceInformation in the database
        List<ServiceInformation> serviceInformationList = serviceInformationRepository.findAll();
        assertThat(serviceInformationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteServiceInformation() throws Exception {
        // Initialize the database
        serviceInformationRepository.saveAndFlush(serviceInformation);
        int databaseSizeBeforeDelete = serviceInformationRepository.findAll().size();

        // Get the serviceInformation
        restServiceInformationMockMvc.perform(delete("/api/service-informations/{id}", serviceInformation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ServiceInformation> serviceInformationList = serviceInformationRepository.findAll();
        assertThat(serviceInformationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceInformation.class);
        ServiceInformation serviceInformation1 = new ServiceInformation();
        serviceInformation1.setId(1L);
        ServiceInformation serviceInformation2 = new ServiceInformation();
        serviceInformation2.setId(serviceInformation1.getId());
        assertThat(serviceInformation1).isEqualTo(serviceInformation2);
        serviceInformation2.setId(2L);
        assertThat(serviceInformation1).isNotEqualTo(serviceInformation2);
        serviceInformation1.setId(null);
        assertThat(serviceInformation1).isNotEqualTo(serviceInformation2);
    }
}
