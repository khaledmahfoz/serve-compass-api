import { IPaginationMetaData } from '@interfaces/helpers/pagination-metadata';
import { PerPageLimit } from '@lib/constants/per-page-limit';

export const constructPaginationMetaData = (
  page: number,
  total: number,
): IPaginationMetaData => ({
  page,
  perPage: PerPageLimit,
  total,
  lastPage: Math.ceil(total / PerPageLimit),
});

export const constructSkip = (page: number): number =>
  (page - 1) * PerPageLimit;
