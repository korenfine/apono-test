import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccessLogModel, AccessLogSchema } from '@models/access-log.model';
import { CitizenModel, CitizenSchema } from '@models/citizen.model';
import { PlaceModel, PlaceSchema } from '@models/place.model';
import { GeneralService } from './general.service';

@Module({
  controllers: [],
  providers: [GeneralService],
  exports: [GeneralService],
  imports: [
    MongooseModule.forFeature([
      { name: AccessLogModel.name, schema: AccessLogSchema },
      { name: CitizenModel.name, schema: CitizenSchema },
      { name: PlaceModel.name, schema: PlaceSchema }
    ]),
  ]
})
export class GeneralModule {}
