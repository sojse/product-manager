import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import SearchProduct from "./SearchProduct.jsx";
import useProduct from "../hooks/useProduct.js";
import useCategories from "../hooks/useCategories.js";

function AddProductToCategory({ onAdd }) {
  const [searching, setSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const productContext = useProduct();
  const categoriesContext = useCategories();
  const navigate = useNavigate();

  useEffect(() => {
    categoriesContext.getCategories(); // Assuming you have a getCategories function in your context
  }, [categoriesContext]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const onSearch = (sku) => {
    setSearching(true);
    productContext.onSearch(sku);
  };

  return (
    <div className="m-4">
      <Link to="/">
        <Button color={"light"}> Back to home</Button>
      </Link>
      <SearchProduct
        onSearch={onSearch}
        searching={searching}
        title={"Add Product to Category"}
      />
      <div>
        {searching && Object.keys(productContext.foundProduct).length === 0 && (
          <span className="text-1x1 font-bold m-4">Product not found</span>
        )}
        {Object.keys(productContext.foundProduct).length !== 0 && searching && (
          <div className="max-w-md p-6 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {productContext.foundProduct.name}
            </h5>

            <span className="mb-5 font-normal text-gray-700 dark:text-gray-400">
              SKU: {productContext.foundProduct.stockKeepingUnit}
            </span>

            <div className="mb-3">
              <select
                className="border-2 rounded-md p-1"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categoriesContext.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.id} - {category.name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              color={"bright"}
              handleSubmit={(e) => {
                categoriesContext.onAddProductToCategory(
                  selectedCategory,
                  productContext.foundProduct
                );
                navigate("/");
              }}
            >
              Add
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProductToCategory;
