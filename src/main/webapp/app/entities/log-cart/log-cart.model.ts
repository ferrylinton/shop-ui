import { BaseEntity } from './../../shared';

export const enum CartOperation {
    'CHECK_OUT',
    'UPDATE',
    'CANCEL'
}

export class LogCart implements BaseEntity {
    constructor(
        public id?: number,
        public ip?: string,
        public transactionNumber?: string,
        public cartOperation?: CartOperation,
        public oldData?: any,
        public newData?: any,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
    ) {
    }
}
