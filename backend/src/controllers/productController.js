import Product from "../models/Product.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("pd_ct_id", "ct_id");
    const formattedProducts = products.map(product => ({
      pd_id: product._id,
      pd_code: product.pd_code,
      pd_ct_id: product.pd_ct_id?._id || null,
      pd_name: product.pd_name,
      pd_price: product.pd_price,
      pd_created_at: product.createdAt,
      pd_updated_at: product.updatedAt,
      pd_image_url: product.pd_image_url
    }));
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("pd_ct_id", "ct_id");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({
      pd_id: product._id,
      pd_code: product.pd_code,
      pd_ct_id: product.pd_ct_id?._id || null,
      pd_name: product.pd_name,
      pd_price: product.pd_price,
      pd_created_at: product.createdAt,
      pd_updated_at: product.updatedAt,
      pd_image_url: product.pd_image_url
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Create new product
export const createProduct = async (req, res) => {
  try {
    const { pd_code, pd_ct_id, pd_name, pd_price } = req.body;
    const newProduct = new Product({ pd_code, pd_ct_id, pd_name, pd_price });
    await newProduct.save();

    res.status(201).json({
      pd_id: newProduct._id,
      pd_code: newProduct.pd_code,
      pd_ct_id: newProduct.pd_ct_id,
      pd_name: newProduct.pd_name,
      pd_price: newProduct.pd_price,
      pd_created_at: newProduct.createdAt,
      pd_updated_at: newProduct.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Search products by name using query params
export const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required" });
    }

    const products = await Product.find({ pd_name: { $regex: keyword, $options: "i" } });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
