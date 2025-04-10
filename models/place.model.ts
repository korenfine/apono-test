import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RoleModel } from './role.model';

@Schema({ collection: "places" })
export class PlaceModel {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: RoleModel.name }] })
  rolesAllowed!: RoleModel[];
}

export type PlaceDocument = HydratedDocument<PlaceModel>;
export const PlaceSchema = SchemaFactory.createForClass(PlaceModel);
