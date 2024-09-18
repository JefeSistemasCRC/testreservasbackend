import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { StandardResponseInterceptor } from '@shared/interceptors/standard-response.interceptor';
import { LoggerMiddleware } from '@shared/middlewares/logger.middleware';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ReservasModule } from './reservas/reservas.module';
import { EspaciosModule } from './espacios/espacios.module';
import constants from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(constants.MONGO_STRING_CONNECTION),
    CacheModule.register({
      isGlobal: true,
      store: 'splittier',
    }),
    UserModule,
    AuthModule,
    ReservasModule,
    EspaciosModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: StandardResponseInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
