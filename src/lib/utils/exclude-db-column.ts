import { dataSource } from '@lib/database/data-source';
import { ObjectType } from 'typeorm';

export const excludeColumns = <Entity>(
  entity: ObjectType<Entity>,
  columnsToExclude: string[],
): string[] =>
  dataSource
    .getRepository(entity)
    .metadata.columns.map((column) => column.databaseName)
    .filter((columnName) => !columnsToExclude.includes(columnName));
