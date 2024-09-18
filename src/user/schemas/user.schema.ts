import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;
  rol: any;
}

// Define `UserDocument` type as an alias for the `User` class extending Mongoose's `Document` interface
export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
