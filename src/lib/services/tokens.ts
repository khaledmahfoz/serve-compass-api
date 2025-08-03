import { randomUUID } from 'node:crypto';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class TokensService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setToken(key: string, value: string, ttl: number = 0): Promise<string> {
    const token = randomUUID();
    await this.cacheManager.set(`${key}:${token}`, value, ttl);
    return token;
  }

  getToken(key: string): Promise<string | undefined> {
    return this.cacheManager.get<string>(key);
  }

  async deleteToken(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  setEmailVerificationToken(email: string): Promise<string> {
    return this.setToken(`email-verification-tokens`, email, 24 * 60 * 60);
  }

  getEmailVerificationToken(token: string): Promise<string | undefined> {
    return this.getToken(`email-verification-tokens:${token}`);
  }

  deleteEmailVerificationToken(token: string): Promise<void> {
    return this.deleteToken(`email-verification-tokens:${token}`);
  }

  setPasswordUpdateToken(email: string): Promise<string> {
    return this.setToken(`password-update-tokens`, email, 24 * 60 * 60);
  }

  getPasswordUpdateToken(token: string): Promise<string | undefined> {
    return this.getToken(`password-update-tokens:${token}`);
  }

  deletePasswordUpdateToken(token: string): Promise<void> {
    return this.deleteToken(`password-update-tokens:${token}`);
  }
}
