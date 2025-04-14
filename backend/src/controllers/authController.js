import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Login User
export const loginUser = async (req, res) => {
  const { us_email, us_password } = req.body;

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ us_email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(us_password, user.us_password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d', // Set expired token (7 hari)
    });

    // Kirim token dan data user
    res.json({
      token,
      user: {
        us_id: user._id,
        us_name: user.us_name,
        us_email: user.us_email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
