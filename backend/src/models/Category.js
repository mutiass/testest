import mongoose from 'mongoose';

// models/Category.js
const categorySchema = new mongoose.Schema({
    ct_id: { type: mongoose.Schema.Types.ObjectId },
    ct_code: { type: String, required: true, unique: true },
    ct_name: { type: String, required: true }
}, { timestamps: true });

categorySchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.ct_id = ret._id;
        ret.ct_created_at = ret.createdAt;
        ret.ct_updated_at = ret.updatedAt;
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
    }
});

export default mongoose.model('Category', categorySchema);