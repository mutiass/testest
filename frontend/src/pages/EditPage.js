import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct, fetchProductById } from '../api';
import '../styles/EditPage.scss'; // Pastikan mengimpor SCSS yang benar

const API_IMAGE = process.env.REACT_APP_API_URL_IMAGE || "http://localhost:5000/api/images";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    pd_code: '',
    pd_ct_id: '',
    pd_name: '',
    pd_price: '',
    pd_image_url: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        console.log(data.pd_image_url);
      } catch (error) {
        console.error('Gagal mengambil data produk:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, product);
      navigate('/');
    } catch (error) {
      console.error('Gagal memperbarui produk:', error);
    }
  };

  return (
    <div className="edit-page">
      <div className="form-container">
        <h1 className="form-title">🛠️ Edit Produk</h1>

        <div className="content-wrapper">
          {/* Form Edit Produk */}
          <div className="form">
            <form onSubmit={handleSubmit}>
              {[
                { label: 'Product Code', name: 'pd_code', type: 'text' },
                { label: 'Category ID', name: 'pd_ct_id', type: 'text' },
                { label: 'Product Name', name: 'pd_name', type: 'text' },
                { label: 'Product Price', name: 'pd_price', type: 'number' },
                { label: 'URL Image', name: 'pd_image_url', type: 'text' },
              ].map((field, index) => (
                <div key={index} className="input-group">
                  <label className="label">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={product[field.name]}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              ))}

              <div className="submit-btn-container">
                <button type="submit" className="submit-btn">
                  Save
                </button>
              </div>
            </form>
          </div>

          {/* Preview Image */}
          {product.pd_image_url && (
            <div className="image-preview">
              <img
                src={`${API_IMAGE}/${product.pd_image_url}`}
                alt="Preview"
                className="image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPage;
