import mongoose, { Document } from "mongoose";

export interface IService extends Document {
  title: string;
  image: string;
  description: string[];
  features: string[];
}

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: [String], required: true },
    features: { type: [String], required: true },
  },
  { timestamps: true }
);
export const Service = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
