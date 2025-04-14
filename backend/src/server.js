import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { protect } from './middleware/authMiddleware.js';  // Import middleware proteksi

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization, access_token"
}));

// Tambahkan ini jika OPTIONS request masih error
app.options("*", cors());

// Menentukan __dirname secara manual di ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware untuk menyajikan gambar secara statis
app.use('/api/images', express.static(path.join(__dirname, '../images')));

// Koneksi ke database
connectDB();

app.use('/auth', authRoutes);
app.use('/api', protect);     // semua di bawah /api pakai token
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
