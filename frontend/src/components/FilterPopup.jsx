import React from "react";
import "../styles/filterpopup.scss";

const FilterPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="filter-popup">
      <h4>By Category</h4>
      <div className="categories">
        <button className="category">Viva</button>
        <button className="category">Hanasui</button>
      </div>
      <button className="apply-button" onClick={onClose}>Apply</button>
    </div>
  );
};

export default FilterPopup;
