import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const errorLevels = {
  levels: {
    fatal: 0,
    error: 1,
    verbose: 2,
    warn: 3,
    info: 4,
    debug: 5,
  },
  colors: {
    fatal: 'bold red',
    error: 'red',
    verbose: 'italic yellow',
    warn: 'italic yellow',
    info: 'blue',
    debug: 'bold green',
    context: 'bold magenta',
    date: 'bold cyan',
  },
};
winston.addColors(errorLevels.colors);

const colorizer = winston.format.colorize();

export const logger = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({
          all: true,
        }),
        winston.format.printf((info) => {
          const date = new Date().toLocaleString('en-US', {
            timeZone: 'Africa/Cairo',
          });
          return `${colorizer.colorize('context', `[${info.context}]`)}\t[${info.level}] ${colorizer.colorize('date', `[${date}]`)}  ${info.message}`;
        }),
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/debug-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'debug',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
      zippedArchive: true,
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '7d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
} satisfies WinstonModuleOptions;
