import { Processor, WorkerHost } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bullmq';

@Processor('emailQueue')
export class EmailProcessor extends WorkerHost {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async process(job: Job<{ email: string; token: string }>): Promise<void> {
    switch (job.name) {
      case 'sendVerificationEmail': {
        const { email, token } = job.data;
        await this.mailerService.sendMail({
          to: email,
          subject: 'Email verification',
          template: 'email-verification',
          context: {
            verificationLink: `${this.configService.getOrThrow<string>(
              'CLIENT_BASE_URL',
            )}/auth/verify-email/${token}`,
          },
        });
        break;
      }
      case 'sendUpdateEmail': {
        const { email } = job.data;
        await this.mailerService.sendMail({
          to: email,
          subject: 'Email updated',
          template: 'email-updated',
          context: {
            email,
          },
        });
        break;
      }
    }
  }
}
