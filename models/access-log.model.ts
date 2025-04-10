import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: "access-logs", timestamps: true })
export class AccessLogModel {
  @Prop({ required: true })
  citizen!: string;

  @Prop({ required: true })
  role!: string;

  @Prop({ required: true })
  place!: string;

  @Prop({ required: true })
  result!: string;

  @Prop({ default: new Date() })
  timestamp!: Date;
}

export type AccessLogDocument = HydratedDocument<AccessLogModel>;
export const AccessLogSchema = SchemaFactory.createForClass(AccessLogModel);
