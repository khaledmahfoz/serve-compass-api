import { IHealth } from '@interfaces/health/health';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): IHealth {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
