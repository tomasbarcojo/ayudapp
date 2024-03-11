import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import appConfig from './config/app.config';
import appConfigSchema from './config/app.schema';
import { dataSourceOptions } from './ormconfig';

import { CommonModule } from './common/common.module';

// import { HealthController } from './health/health.controller';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ClientModule } from './modules/client/client.module';
import { UploadFilesModule } from './modules/upload-image/upload-file.module';
import { AtGuard } from './common/guards';

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: appConfigSchema,
    }),

    // TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...dataSourceOptions,
          logging: configService.get<string>('config.database.log') === 'yes',
          timezone: 'Z',
          autoLoadEntities: true,
        };
      },
    }),

    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     ttl: configService.get<number>('CACHE_TTL'),
    //     isGlobal: true,
    //   }),
    // }),

    // Common Module
    CommonModule,

    HttpModule,

    // Modules
    AuthModule,
    UserModule,
    CategoryModule,
    ClientModule,
    UploadFilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
