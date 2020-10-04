import mongoose, { Document, Model, Schema } from 'mongoose';
export enum BeachPosition {
  E = 'E',
  S = 'S',
  W = 'W',
  N = 'N',
}

export interface Beach {
  _id?: string;
  name: string;
  position: BeachPosition;
  lat: number;
  lng: number;
}

const schema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;
      },
    },
  }
);

interface BeachModel extends Omit<Beach, '_id'>, Document {}
export const Beach: Model<BeachModel> = mongoose.model('Beach', schema);
