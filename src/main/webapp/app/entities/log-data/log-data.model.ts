import { BaseEntity } from './../../shared';

export const enum DataType {
    'CATEGORY',
    'PRODUCT',
    'AUTHORITY',
    'USER'
}

export const enum DataOperation {
    'ADD',
    'UPDATE',
    'DELETE'
}

export class LogData implements BaseEntity {
    constructor(
        public id?: number,
        public ip?: string,
        public dataType?: DataType,
        public dataOperation?: DataOperation,
        public oldData?: any,
        public newData?: any,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
    ) {
    }
}
