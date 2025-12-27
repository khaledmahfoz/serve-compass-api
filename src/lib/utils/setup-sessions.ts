import * as crypto from 'crypto';

import { ISerializedUser } from '@interfaces/users/serialized-user';
import { INestApplication, InternalServerErrorException } from '@nestjs/common';
import { RedisStore } from 'connect-redis';
import { Request } from 'express';
import * as session from 'express-session';
import { createClient } from 'redis';

export async function setupSessions(app: INestApplication): Promise<void> {
  const redisClient = createClient({
    username: process.env.REDIS_USERNAME!,
    password: process.env.REDIS_PASSWORD!,
    socket: {
      host: process.env.REDIS_HOST!,
      port: Number.parseInt(process.env.REDIS_PORT!),
    },
  });

  await redisClient.connect().catch(() => {
    throw new InternalServerErrorException('Redis connection error');
  });

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'sessions:',
    disableTouch: true,
    ttl: Number.parseInt(process.env.REDIS_TTL!),
  });

  const isProduction = process.env.NODE_ENV === 'production';

  app.use(
    session({
      store: redisStore,
      genid: (req: Request) => {
        const randomId = crypto.randomBytes(16).toString('hex');
        return `${randomId}/user/${(req.user as ISerializedUser)?.id}`;
      },
      name: 'sid',
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      proxy: true,
      cookie: {
        path: '/',
        httpOnly: isProduction,
        secure: isProduction,
        maxAge: Number.parseInt(process.env.SESSION_TTL!),
        sameSite: 'lax',
      },
    }),
  );
}
