import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Get All Orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("or_products.or_pd_id", "pd_name pd_price");

        const formattedOrders = orders.map(order => ({
            or_id: order._id,
            or_products: order.or_products.map(product => ({
                or_pd_id: product.or_pd_id._id,
                or_pd_name: product.or_pd_id.pd_name,
                or_pd_price: product.or_pd_id.pd_price,
                or_pd_qty: product.or_pd_qty
            })),
            or_amount: order.or_amount,
            or_total_qty: order.or_total_qty,
            or_created_at: order.createdAt,
            or_updated_at: order.updatedAt
        }));

        res.json(formattedOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("or_products.or_pd_id", "pd_name pd_price");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({
            or_id: order._id,
            or_products: order.or_products.map(product => ({
                or_pd_id: product.or_pd_id._id,
                or_pd_name: product.or_pd_id.pd_name,
                or_pd_price: product.or_pd_id.pd_price,
                or_pd_qty: product.or_pd_qty
            })),
            or_amount: order.or_amount,
            or_total_qty: order.or_total_qty,
            or_created_at: order.createdAt,
            or_updated_at: order.updatedAt
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search Orders by Product Name (Query Params)
export const searchOrders = async (req, res) => {
    try {
        const keyword = req.query.keyword; // ✅ Gunakan `keyword` sebagai query param

        if (!keyword) {
            return res.status(400).json({ error: "Keyword is required" });
        }

        const orders = await Order.find()
            .populate({
                path: "or_products.or_pd_id",
                match: { pd_name: { $regex: keyword, $options: "i" } },
                select: "pd_name pd_price"
            })
            .exec();

        // Filter hanya order yang memiliki produk yang cocok dengan keyword
        const filteredOrders = orders.filter(order =>
            order.or_products.some(product => product.or_pd_id !== null)
        );

        if (filteredOrders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        const formattedOrders = filteredOrders.map(order => ({
            or_id: order._id,
            or_products: order.or_products
                .filter(product => product.or_pd_id !== null)
                .map(product => ({
                    or_pd_id: product.or_pd_id._id,
                    or_pd_name: product.or_pd_id.pd_name,
                    or_pd_price: product.or_pd_id.pd_price,
                    or_pd_qty: product.or_pd_qty
                })),
            or_amount: order.or_amount,
            or_total_qty: order.or_total_qty,
            or_created_at: order.createdAt,
            or_updated_at: order.updatedAt
        }));

        res.json(formattedOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create Order
export const createOrder = async (req, res) => {
    try {
        const { or_products } = req.body;

        let totalAmount = 0;
        let totalQty = 0;

        // Validasi produk dan hitung total harga dan jumlah produk
        const processedProducts = await Promise.all(
            or_products.map(async (product) => {
                const productData = await Product.findById(product.or_pd_id);
                if (!productData) {
                    throw new Error(`Product with ID ${product.or_pd_id} not found`);
                }
                const productTotal = productData.pd_price * product.or_pd_qty;
                totalAmount += productTotal;
                totalQty += product.or_pd_qty;

                return {
                    or_pd_id: product.or_pd_id,
                    or_pd_qty: product.or_pd_qty
                };
            })
        );

        const newOrder = new Order({
            or_products: processedProducts,
            or_amount: totalAmount,
            or_total_qty: totalQty
        });

        await newOrder.save();

        res.status(201).json({
            or_id: newOrder._id,
            or_products: newOrder.or_products,
            or_amount: newOrder.or_amount,
            or_total_qty: newOrder.or_total_qty,
            or_created_at: newOrder.createdAt,
            or_updated_at: newOrder.updatedAt
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Order
export const updateOrder = async (req, res) => {
    try {
        const { or_products } = req.body;

        let totalAmount = 0;
        let totalQty = 0;

        const processedProducts = await Promise.all(
            or_products.map(async (product) => {
                const productData = await Product.findById(product.or_pd_id);
                if (!productData) {
                    throw new Error(`Product with ID ${product.or_pd_id} not found`);
                }
                const productTotal = productData.pd_price * product.or_pd_qty;
                totalAmount += productTotal;
                totalQty += product.or_pd_qty;

                return {
                    or_pd_id: product.or_pd_id,
                    or_pd_qty: product.or_pd_qty
                };
            })
        );

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                or_products: processedProducts,
                or_amount: totalAmount,
                or_total_qty: totalQty,
                updatedAt: Date.now()
            },
            { new: true }
        ).populate("or_products.or_pd_id", "pd_name pd_price");

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({
            or_id: updatedOrder._id,
            or_products: updatedOrder.or_products.map(product => ({
                or_pd_id: product.or_pd_id._id,
                or_pd_name: product.or_pd_id.pd_name,
                or_pd_price: product.or_pd_id.pd_price,
                or_pd_qty: product.or_pd_qty
            })),
            or_amount: updatedOrder.or_amount,
            or_total_qty: updatedOrder.or_total_qty,
            or_created_at: updatedOrder.createdAt,
            or_updated_at: updatedOrder.updatedAt
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
