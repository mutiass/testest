// import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedData = async () => {
    await connectDB();
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const categories = await Category.insertMany([
        { ct_code: 'CAT001', ct_name: 'Viva' },
        { ct_code: 'CAT002', ct_name: 'Hanasui' }
    ]);

    const vivaCategory = categories.find(c => c.ct_name === 'Viva');
    const hanasuiCategory = categories.find(c => c.ct_name === 'Hanasui');

    const products = await Product.insertMany([
        { pd_code: 'PD001', pd_ct_id: vivaCategory._id, pd_name: 'Viva Milk Cleanser Bengkuang 200 ml', pd_price: 15200, pd_image_url: "viva-milk-cleanser-bengkuang-200-ml.png" },
        { pd_code: 'PD002', pd_ct_id: vivaCategory._id, pd_name: 'Viva Face Tonic Bengkuang 200 ml', pd_price: 14300, pd_image_url: "viva-face-tonic-bengkuang-200-ml.png" },
        { pd_code: 'PD003', pd_ct_id: vivaCategory._id, pd_name: 'Viva Pelembab Bengkuang', pd_price: 8500, pd_image_url: "viva-pelembab-bengkuang.png" },
        { pd_code: 'PD004', pd_ct_id: vivaCategory._id, pd_name: 'Viva Special Day Cream 22 gram', pd_price: 7700, pd_image_url: "viva-special-day-cream.png" },
        { pd_code: 'PD005', pd_ct_id: vivaCategory._id, pd_name: 'Viva Collagen Night Cream 22 gram', pd_price: 13700, pd_image_url: "viva-collagen-night-cream.png" },
        { pd_code: 'PD006', pd_ct_id: vivaCategory._id, pd_name: 'Viva Peeling Serum with Triple Gentle Exfoliation', pd_price: 22750, pd_image_url: "viva-peeling-serum-with-triple-gentle-exfoliation.png" },
        { pd_code: 'PD007', pd_ct_id: vivaCategory._id, pd_name: 'Viva Queen Revitalizing Eye Serum', pd_price: 46000, pd_image_url: "viva-queen-revitalizing-eye-serum.png" },
        { pd_code: 'PD008', pd_ct_id: hanasuiCategory._id, pd_name: 'Hanasui Flawless Glow 10 Day Cream 15g', pd_price: 42000, pd_image_url: "hanasui-flawless-glow-10-day-cream-15g.png" },
        { pd_code: 'PD009', pd_ct_id: hanasuiCategory._id, pd_name: 'Hanasui Flawless Glow 10 Night Cream 15g', pd_price: 43000, pd_image_url: "hanasui-flawless-glow-10-night-cream-15g.png" },
        { pd_code: 'PD0010', pd_ct_id: hanasuiCategory._id, pd_name: 'Hanasui Collagen Water Sunscreen SPF 50', pd_price: 31400, pd_image_url: "hanasui-collagen-water-sunscreen-spf-50.png" },
    ]);

    const users = await User.insertMany([
      {
        us_name: 'Mutia S',
        us_password: bcrypt.hashSync('password123', 10),
        us_email: 'mutia@gmail.com',
        us_phone_number: '081234567890',
        us_address: 'Jl. Basuki Rahmat No. 1',
      },
      {
        us_name: 'Sakinah M',
        us_password: bcrypt.hashSync('password456', 10),
        us_email: 'msakinah@gmail.com',
        us_phone_number: '081298765432',
        us_address: 'Jl. Basuki Rahmat No. 2',
      },
    ]);
    

    await Order.insertMany([
        {
            or_products: [
                { or_pd_id: products[0]._id, or_pd_qty: 2 },  // Viva Milk Cleanser Bengkuang 200 ml (2 pcs)
                { or_pd_id: products[3]._id, or_pd_qty: 1 }   // Viva Special Day Cream (1 pcs)
            ],
            or_total_qty: 2 + 1, // Total jumlah produk dalam order
            or_amount: (products[0].pd_price * 2) + (products[3].pd_price * 1) // Total harga
        },
        {
            or_products: [
                { or_pd_id: products[2]._id, or_pd_qty: 1 },  // Viva Pelembab Bengkuang (1 pcs)
                { or_pd_id: products[4]._id, or_pd_qty: 2 },  // Viva Collagen Night Cream (2 pcs)
                { or_pd_id: products[7]._id, or_pd_qty: 1 }   // Hanasui Flawless Glow 10 Day Cream 15g (1 pcs)
            ],
            or_total_qty: 1 + 2 + 1,
            or_amount: 
                (products[2].pd_price * 1) + 
                (products[4].pd_price * 2) + 
                (products[7].pd_price * 1)
        },
        {
            or_products: [
                { or_pd_id: products[5]._id, or_pd_qty: 3 },  // Viva Peeling with Triple Gentle Exfoliation (3 pcs)
                { or_pd_id: products[8]._id, or_pd_qty: 2 }   // Hanasui Flawless Glow 10 Night Cream 15g (2 pcs)
            ],
            or_total_qty: 3 + 2,
            or_amount: 
                (products[5].pd_price * 3) + 
                (products[8].pd_price * 2)
        }
    ]);
    

    console.log('Database Seeded!');
    process.exit();
};

seedData();
