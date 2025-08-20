import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'about' })
export class About extends Document {
  @Prop({ required: true })
  description!: string;
}

export const AboutSchema = SchemaFactory.createForClass(About);
