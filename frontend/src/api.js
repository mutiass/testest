import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Helper untuk ambil token dan pasang di header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch semua produk
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch produk berdasarkan ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

// Cari produk berdasarkan nama
export const searchProducts = async (keyword) => {
  try {
    const response = await axios.get(`${API_URL}/products/search`, {
      params: { keyword },
      ...getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

// Tambah produk baru
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Update produk berdasarkan ID
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, productData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Hapus produk berdasarkan ID
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Fetch semua orders
export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Fetch semua users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};


// Fetch semua kategori
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data kategori:', error);
    throw error;
  }
};

export const createCategory = async (payload) => {
  try {
    const res = await axios.post(`${API_URL}/categories`, payload, getAuthHeader());
    return res.data;
  } catch (error) {
    console.error('Gagal membuat kategori:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/categories/${id}`, getAuthHeader());
    return res.data;
  } catch (error) {
    console.error('Gagal menghapus kategori:', error);
    throw error;
  }
};

