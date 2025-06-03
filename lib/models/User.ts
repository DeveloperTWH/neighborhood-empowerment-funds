import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, default: null },
  oauthProvider: { type: String, default: null },
  oauthId: { type: String, default: null },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String, default: null },
//   isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
