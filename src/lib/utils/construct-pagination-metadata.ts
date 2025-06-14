import { IPaginationMetaData } from '@interfaces/helpers/pagination-metadata';

export const constructPaginationMetaData = (
  page: number,
  limit: number,
  total: number,
): IPaginationMetaData => ({
  page,
  perPage: limit,
  total,
  lastPage: Math.ceil(total / limit),
});

export const constructSkip = (page: number, limit: number): number =>
  (page - 1) * limit;
