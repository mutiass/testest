import mongoose from 'mongoose';

// models/User.js
const userSchema = new mongoose.Schema({
  us_name: { type: String, required: true },
  us_password: { type: String, required: true },
  us_email: { type: String, required: true, unique: true },
  us_phone_number: { type: String, required: true },
  us_address: { type: String, required: true }
}, { timestamps: true });

userSchema.set('toJSON', {
  transform: (doc, ret) => {
      ret.us_id = ret._id;
      ret.us_created_at = ret.createdAt;
      ret.us_updated_at = ret.updatedAt;
      delete ret._id;
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.__v;
  }
});

export default mongoose.model('User', userSchema);