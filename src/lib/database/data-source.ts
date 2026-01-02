import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { getDatabaseConfig } from './database.config';

config();

export default new DataSource(
  getDatabaseConfig(new ConfigService()) as DataSourceOptions,
);
