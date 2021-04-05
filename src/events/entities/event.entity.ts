import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
class Event extends mongoose.Document {
  @Prop()
  type: string;

  @Prop({ index: true })
  name: string;

  @Prop({ type: mongoose.SchemaTypes.Mixed })
  payload: Record<string, any>;
}

const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.index({ name: 1, type: -1 });

export { Event, EventSchema };
