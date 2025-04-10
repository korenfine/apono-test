import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AccessLogModel, AccessLogDocument } from '@models/access-log.model';
import { CitizenModel, CitizenDocument } from '@models/citizen.model';
import { PlaceModel, PlaceDocument } from '@models/place.model';

import { AccessLogDto, GetFormDataOptionDto } from '@apono/dto';

@Injectable()
export class GeneralService {
  constructor(
    @InjectModel(PlaceModel.name) private placeModel: Model<PlaceDocument>,
    @InjectModel(CitizenModel.name) private citizenModel: Model<CitizenDocument>,
    @InjectModel(AccessLogModel.name) private accessLogModel: Model<AccessLogDocument>
  ) {}


  async getCitizens(): Promise<GetFormDataOptionDto[]> {
    const citizens = await this.citizenModel.find();
    return citizens.map((citizen) => ({
      value: citizen.name,
      label: citizen.name,
    }));
  }

  async getPlaces(): Promise<GetFormDataOptionDto[]> {
    const places = await this.placeModel.find();
    return places.map((place) => ({
      value: place.name,
      label: place.name,
    }));
  }

  async getAccessLogs(): Promise<AccessLogDto[]> {
    const data = await this.accessLogModel.find().lean();
    return data.map(accessLog => ({
      citizen: accessLog.citizen,
      role: accessLog.role,
      place: accessLog.place,
      result: accessLog.result,
      timestamp: accessLog.timestamp,
    }));
  }
}