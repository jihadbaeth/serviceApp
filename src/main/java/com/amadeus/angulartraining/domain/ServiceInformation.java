package com.amadeus.angulartraining.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ServiceInformation.
 */
@Entity
@Table(name = "service_information")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ServiceInformation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plate")
    private String plate;

    @Column(name = "route")
    private String route;

    @Column(name = "driver_first_name")
    private String driverFirstName;

    @Column(name = "driver_surname")
    private String driverSurname;

    @Column(name = "driver_phone_number")
    private String driverPhoneNumber;

    @Column(name = "car_model")
    private String carModel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlate() {
        return plate;
    }

    public ServiceInformation plate(String plate) {
        this.plate = plate;
        return this;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public String getRoute() {
        return route;
    }

    public ServiceInformation route(String route) {
        this.route = route;
        return this;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getDriverFirstName() {
        return driverFirstName;
    }

    public ServiceInformation driverFirstName(String driverFirstName) {
        this.driverFirstName = driverFirstName;
        return this;
    }

    public void setDriverFirstName(String driverFirstName) {
        this.driverFirstName = driverFirstName;
    }

    public String getDriverSurname() {
        return driverSurname;
    }

    public ServiceInformation driverSurname(String driverSurname) {
        this.driverSurname = driverSurname;
        return this;
    }

    public void setDriverSurname(String driverSurname) {
        this.driverSurname = driverSurname;
    }

    public String getDriverPhoneNumber() {
        return driverPhoneNumber;
    }

    public ServiceInformation driverPhoneNumber(String driverPhoneNumber) {
        this.driverPhoneNumber = driverPhoneNumber;
        return this;
    }

    public void setDriverPhoneNumber(String driverPhoneNumber) {
        this.driverPhoneNumber = driverPhoneNumber;
    }

    public String getCarModel() {
        return carModel;
    }

    public ServiceInformation carModel(String carModel) {
        this.carModel = carModel;
        return this;
    }

    public void setCarModel(String carModel) {
        this.carModel = carModel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ServiceInformation serviceInformation = (ServiceInformation) o;
        if (serviceInformation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceInformation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceInformation{" +
            "id=" + getId() +
            ", plate='" + getPlate() + "'" +
            ", route='" + getRoute() + "'" +
            ", driverFirstName='" + getDriverFirstName() + "'" +
            ", driverSurname='" + getDriverSurname() + "'" +
            ", driverPhoneNumber='" + getDriverPhoneNumber() + "'" +
            ", carModel='" + getCarModel() + "'" +
            "}";
    }
}
