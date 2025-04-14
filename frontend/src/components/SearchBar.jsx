import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { searchProducts, fetchProducts } from "../api"; // Pakai fetchProducts
import "../styles/searchbar.scss";

const SearchBar = ({ setProducts }) => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const prevKeyword = useRef("");

  useEffect(() => {
    if (!keyword.trim()) return;
    if (prevKeyword.current === keyword) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const data = await searchProducts(keyword);
        setProducts(data);
        prevKeyword.current = keyword;
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword, setProducts]);

  const handleReset = async () => {
    setKeyword("");
    prevKeyword.current = "";
    try {
      const data = await fetchProducts(); // Kembali ke semua produk
      setProducts(data);
    } catch (error) {
      console.error("Error resetting search:", error);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Cari produk..."
        />
      </div>

      {keyword && (
        <button className="reset-button" onClick={handleReset} disabled={loading}>
          Reset Search
        </button>
      )}
    </div>
  );
};

export default SearchBar;