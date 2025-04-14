import User from "../models/User.js";


// Get All Users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const formattedUsers = users.map(user => ({
            us_id: user._id,
            us_name: user.us_name,
            us_email: user.us_email,
            us_phone_number: user.us_phone_number,
            us_address: user.us_address,
            us_created_at: user.createdAt,
            us_updated_at: user.updatedAt
        }));
        res.json(formattedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get User by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            us_id: user._id,
            us_name: user.us_name,
            us_email: user.us_email,
            us_phone_number: user.us_phone_number,
            us_address: user.us_address,
            us_created_at: user.createdAt,
            us_updated_at: user.updatedAt
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search Users by Name or Email (using query params)
export const searchUsers = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        if (!keyword) {
            return res.status(400).json({ error: "Keyword is required" });
        }

        const users = await User.find({
            $or: [
                { us_name: { $regex: keyword, $options: "i" } },
                { us_email: { $regex: keyword, $options: "i" } }
            ]
        });

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        const formattedUsers = users.map(user => ({
            us_id: user._id,
            us_name: user.us_name,
            us_email: user.us_email,
            us_phone_number: user.us_phone_number,
            us_address: user.us_address,
            us_created_at: user.createdAt,
            us_updated_at: user.updatedAt
        }));

        res.json(formattedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
