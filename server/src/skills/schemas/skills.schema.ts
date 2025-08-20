import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'skills' })
export class Skills extends Document {
  @Prop({ required: true })
  category!: string;

  @Prop({ type: [String], required: true }) // Ensures skills are stored as an array of strings
  skills!: string[];
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
