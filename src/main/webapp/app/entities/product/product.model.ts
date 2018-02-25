import { BaseEntity } from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public quantity?: number,
        public price?: number,
        public imageContentType?: string,
        public image?: any,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public item?: BaseEntity,
        public categories?: BaseEntity[],
    ) {
    }
}
