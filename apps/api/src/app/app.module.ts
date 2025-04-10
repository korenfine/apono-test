import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppAuthController } from './modules/auth/auth.controller';
import { AppGeneralService } from './modules/general/general.service';
import { AppGeneralController } from './modules/general/general.controller';
import { AppAuthService } from './modules/auth/auth.service';
import { AuthModule } from '@apono/auth';
import { GeneralModule } from '@apono/general';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Import ConfigModule and load .env file
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available
      envFilePath: '.env', // Load the .env file (if you have one)
    }),

    // Use ConfigService to get the MongoDB URI from .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') ?? "mongodb://localhost:27017/apono", // Get the MONGO_URI from the .env file
      }),
      inject: [ConfigService],
    }),    AuthModule,
    GeneralModule
  ],
  controllers: [AppController, AppAuthController, AppGeneralController],
  providers: [
    AppService,
    AppAuthService,
    AppGeneralService
  ],
})
export class AppModule {}
