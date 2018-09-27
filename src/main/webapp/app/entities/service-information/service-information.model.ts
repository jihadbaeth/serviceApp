import { BaseEntity } from './../../shared';

export class ServiceInformation implements BaseEntity {
    constructor(
        public id?: number,
        public plate?: string,
        public route?: string,
        public driverFirstName?: string,
        public driverSurname?: string,
        public driverPhoneNumber?: string,
        public carModel?: string,
    ) {
    }
}
