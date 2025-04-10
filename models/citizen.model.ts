import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RoleModel } from './role.model';

@Schema({ collection: "citizens" })
export class CitizenModel {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: RoleModel.name }] })
  roles!: RoleModel[];
}

export type CitizenDocument = HydratedDocument<CitizenModel>;
export const CitizenSchema = SchemaFactory.createForClass(CitizenModel);
