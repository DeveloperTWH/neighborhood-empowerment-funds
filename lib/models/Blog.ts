import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  author: string;
  coverImage: string; // File path or URL
  content: string;    // HTML string
  category: mongoose.Types.ObjectId[]; // Array of category IDs
  readTime: number;
  featured: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    coverImage: { type: String, required: true },
    content: { type: String, required: true },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    readTime: { type: Number, required: true },
    featured: { type: Boolean, default: false }, // <-- added field
  },
  {
    timestamps: true,
  }
);

export default models.Blog || model<IBlog>("Blog", BlogSchema);
