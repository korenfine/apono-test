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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/apono'),
    AuthModule,
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
