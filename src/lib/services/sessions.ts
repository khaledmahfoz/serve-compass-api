import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class SessionsService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async deleteUserSessions(userId: string): Promise<void> {
    const pattern = `sessions:*/user/${userId}`;
    const keys = await this.cacheManager.store.keys(pattern);
    if (keys.length > 0) await this.cacheManager.store.mdel(...keys);
  }
}
