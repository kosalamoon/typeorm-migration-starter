import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import { LoggerMiddleware } from './utils/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    WinstonModule.forRoot({
      level: 'debug',
      defaultMeta: { service: 'typeorm-migration-starter' },
      transports: [
        new WinstonCloudWatch({
          awsAccessKeyId: 'AKIAZUSFOAAHKEWAYHDH',
          awsSecretKey: 'K423HUlbHK5KSV5ibXPNw0CAtg5XbhdOrxlKC39v',
          awsRegion: 'ap-southeast-1',
          name: 'CloudWatch',
          logGroupName: 'sample-log-group-name',
          logStreamName: 'sample-log-stream-name',
          jsonMessage: true,
          level: 'debug',
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Nest', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
