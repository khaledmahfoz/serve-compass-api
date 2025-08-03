import { cwd } from 'process';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';

export const MailerOptionsProvider: MailerAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => ({
    transport: {
      host: config.getOrThrow<string>('MAIL_HOST'),
      port: config.getOrThrow<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: config.getOrThrow<string>('MAIL_USER'),
        pass: config.getOrThrow<string>('MAIL_PASSWORD'),
      },
    },
    defaults: { from: config.getOrThrow<string>('MAIL_FROM') },
    template: {
      dir: cwd() + '/src/lib/templates',
      adapter: new PugAdapter(),
      options: { strict: true },
    },
  }),
  inject: [ConfigService],
};
