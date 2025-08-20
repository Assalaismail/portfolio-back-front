import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExperienceDocument = Experience & Document;

@Schema({ collection: 'experience', timestamps: true })
export class Experience {
  @Prop()
  logo?: string;

  @Prop({ required: true })
  company_name!: string;

  @Prop({ required: true })
  position!: string;

//   @Prop({ required: true, type: Date })
//   start_date!: Date;

//   @Prop({ required: true, type: Date })
//   end_date!: Date;

   @Prop({ required: true })
   start_date!: string;

   @Prop({ required: true })
   end_date!: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
