import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  or_products: [
    {
      or_pd_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      or_pd_qty: {
        type: Number,
        required: true
      }
    }
  ],
  or_amount: {
    type: Number,
    default: 0
  },
  or_total_qty: {
    type: Number,
    default: 0
  }
}, { timestamps:  true });

// Middleware untuk menghitung total harga & jumlah produk sebelum disimpan
orderSchema.pre('save', async function (next) {
  let totalQty = 0;
  let totalAmount = 0;

  for (let item of this.or_products) {
    const product = await mongoose.model('Product').findById(item.or_pd_id);
    if (product) {
      totalQty += item.or_pd_qty;
      totalAmount += product.pd_price * item.or_pd_qty;
    }
  }

  this.or_total_qty = totalQty;
  this.or_amount = totalAmount;

  next();
});

// Transformasi JSON untuk response
orderSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.or_id = ret._id;
    ret.or_created_at = ret.createdAt; // Pastikan or_created_at ada
    ret.or_updated_at = ret.updatedAt; // Pastikan or_updated_at ada
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt; // Jangan lupa menghapus `createdAt` dan `updatedAt` jika sudah ditransformasikan
    delete ret.updatedAt;
  }
});

export default mongoose.model('Order', orderSchema);
