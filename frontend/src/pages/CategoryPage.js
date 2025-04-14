import React, { useEffect, useState } from 'react';
import { fetchCategories, createCategory, deleteCategory } from '../api';
import '../styles/category.scss';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ ct_code: '', ct_name: '' });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(newCategory);
      setNewCategory({ ct_code: '', ct_name: '' });
      getCategories();
    } catch (err) {
      console.error('Failed to add category:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await deleteCategory(id);
      getCategories();
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  return (
    <div className="category-page">
      <h2>Category Management</h2>

      <form className="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="ct_code"
          placeholder="Category Code"
          value={newCategory.ct_code}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ct_name"
          placeholder="Category Name"
          value={newCategory.ct_name}
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>

      <div className="category-list">
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((ct) => (
                <tr key={ct.ct_id}>
                  <td>{ct.ct_id}</td>
                  <td>{ct.ct_code}</td>
                  <td>{ct.ct_name}</td>
                  <td>
                    <button onClick={() => handleDelete(ct.ct_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
