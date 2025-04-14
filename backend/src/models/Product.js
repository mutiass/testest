import mongoose from 'mongoose';

// models/Product.js
const productSchema = new mongoose.Schema({
  pd_code: { type: String, required: true, unique: true },
  pd_ct_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  pd_name: { type: String, required: true },
  pd_price: { type: Number, required: true },
  pd_image_url: { type: String, required: true}
}, { timestamps: true });

productSchema.set('toJSON', {
  transform: (doc, ret) => {
      ret.pd_id = ret._id;
      ret.pd_created_at = ret.createdAt;
      ret.pd_updated_at = ret.updatedAt;
      ret.pd_ct_id = ret.pd_ct_id.ct_id; // Hanya ambil ct_id dari Category
      delete ret._id;
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.__v;
  }
});

export default mongoose.model('Product', productSchema);