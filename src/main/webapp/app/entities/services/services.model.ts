import { BaseEntity } from './../../shared';

export class Services implements BaseEntity {
    constructor(
        public id?: number,
        public serviceName?: string,
        public serviceInformation?: BaseEntity,
        public contacts?: BaseEntity[],
    ) {
    }
}
