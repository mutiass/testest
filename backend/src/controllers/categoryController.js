import Category from "../models/Category.js";

// Get All Categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().select("ct_code ct_name createdAt updatedAt");

        const formattedCategories = categories.map(category => ({
            ct_id: category._id,
            ct_code: category.ct_code,
            ct_name: category.ct_name,
            ct_created_at: category.createdAt,
            ct_updated_at: category.updatedAt
        }));

        res.json(formattedCategories);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Category by ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({
            ct_id: category._id,
            ct_code: category.ct_code,
            ct_name: category.ct_name,
            ct_created_at: category.createdAt,
            ct_updated_at: category.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Search Categories by Name (Query Params)
export const searchCategories = async (req, res) => {
    try {
        const keyword = req.query.keyword; // ✅ Menggunakan req.query.keyword

        if (!keyword) {
            return res.status(400).json({ error: "Keyword is required" });
        }

        const categories = await Category.find({ ct_name: { $regex: keyword, $options: "i" } });

        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        const formattedCategories = categories.map(category => ({
            ct_id: category._id,
            ct_code: category.ct_code,
            ct_name: category.ct_name,
            ct_created_at: category.createdAt,
            ct_updated_at: category.updatedAt
        }));

        res.json(formattedCategories);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Update Category
export const updateCategory = async (req, res) => {
    try {
        const { ct_code, ct_name } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { ct_code, ct_name, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({
            ct_id: updatedCategory._id,
            ct_code: updatedCategory.ct_code,
            ct_name: updatedCategory.ct_name,
            ct_created_at: updatedCategory.createdAt,
            ct_updated_at: updatedCategory.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Category
export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Create Category (POST)
export const createCategory = async (req, res) => {
    try {
        const { ct_code, ct_name } = req.body;
        const newCategory = new Category({ ct_code, ct_name });
        await newCategory.save();

        res.status(201).json({
            ct_id: newCategory._id,
            ct_code: newCategory.ct_code,
            ct_name: newCategory.ct_name,
            ct_created_at: newCategory.createdAt,
            ct_updated_at: newCategory.updatedAt
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
