import { BaseEntity } from './../../shared';

export class Cart implements BaseEntity {
    constructor(
        public id?: number,
        public transactionNumber?: string,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public items?: BaseEntity[],
    ) {
    }
}
