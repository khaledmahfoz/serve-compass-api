import { ObjectLiteral, Repository } from 'typeorm';
import { PickKeysByType } from 'typeorm/common/PickKeysByType';

export const constructMaximumOrder = async <T extends ObjectLiteral>(
  repository: Repository<T>,
): Promise<number> => {
  const latestOrder = await repository.maximum(
    'order' as PickKeysByType<T, number>,
  );
  return latestOrder ? latestOrder + 1 : 1;
};
