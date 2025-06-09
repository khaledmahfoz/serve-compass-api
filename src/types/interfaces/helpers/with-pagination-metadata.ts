import { IPaginationMetaData } from '@interfaces/helpers/pagination-metadata';

export interface WithPaginationMetadata<T> {
  data: T;
  metadata: IPaginationMetaData;
}
