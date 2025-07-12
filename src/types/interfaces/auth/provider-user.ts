import { IUser } from '../users/user';

export interface IProviderUser
  extends Omit<IUser, 'id' | 'joinedAt' | 'lastUpdatedAt'> {}
