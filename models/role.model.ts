import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: "roles" })
export class RoleModel {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  subRoles!: string[];
}

export type RoleDocument = HydratedDocument<RoleModel>;
export const RoleSchema = SchemaFactory.createForClass(RoleModel);
