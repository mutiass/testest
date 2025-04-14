import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../api";
import SearchBar from "../components/SearchBar";
import "./Home.css";

const API_IMAGE = process.env.REACT_APP_API_URL_IMAGE || "http://localhost:5000/api/images";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Gagal mengambil produk:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    try {
      await deleteProduct(id);
      alert("Produk berhasil dihapus!");
      getProducts();
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      alert("Gagal menghapus produk.");
    }
  };

  return (
    <div className="container">
      <SearchBar setProducts={setProducts} />
      <div className="product-list">
        {products.length === 0 ? (
          <p>Loading Products...</p>
        ) : (
          products.map((product) => (
            <div key={product.pd_id} className="product-card">
              <img
                src={`${API_IMAGE}/${product.pd_image_url}`}
                alt={product.pd_name}
                className="product-image"
              />
              <div className="product-info">
                <p className="product-name">{product.pd_name}</p>
                <p className="product-price">Rp{product.pd_price},-</p>
              </div>
              <div className="button-container">
                <button className="button-edit" onClick={() => handleEdit(product.pd_id)}>
                  Edit
                </button>
                <button className="button-delete" onClick={() => handleDelete(product.pd_id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
