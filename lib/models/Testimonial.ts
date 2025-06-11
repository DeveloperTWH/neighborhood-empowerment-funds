import { Schema, model, models } from 'mongoose';

const TestimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = models.Testimonial || model('Testimonial', TestimonialSchema);
export default Testimonial;
