// src/projects/schemas/project.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  website_url!: string;

  @Prop({ type: [String], required: true })
  frameworks!: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
