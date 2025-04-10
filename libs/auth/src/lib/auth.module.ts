import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccessLogModel, AccessLogSchema } from '@models/access-log.model';
import { CitizenModel, CitizenSchema } from '@models/citizen.model';
import { PlaceModel, PlaceSchema } from '@models/place.model';
import { RoleModel, RoleSchema } from '@models/role.model';
import { AuthService } from './auth.service';

console.log('PlaceModel.name', PlaceModel.name)
console.log('RoleModel.name', RoleModel.name)
@Module({
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    MongooseModule.forFeature([
      { name: AccessLogModel.name, schema: AccessLogSchema },
      { name: CitizenModel.name, schema: CitizenSchema },
      { name: PlaceModel.name, schema: PlaceSchema },
      { name: RoleModel.name, schema: RoleSchema }
    ]),
  ]
})
export class AuthModule {}
