import Button from "./Button.jsx";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function SearchProduct({ onSearch, searching, title }) {
  const [sku, setSku] = useState("");

  useEffect(() => {
    setSku(""); // Clear SKU when searching state changes
  }, [searching]);

  function inputChange(e) {
    setSku(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(sku);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold m-4">{title}</h2>
      <form className="m-6" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="block mb-2">
            SKU
          </label>
          <input
            type="text"
            className="border-2 rounded-md p-1 "
            placeholder="Enter SKU"
            name="productName"
            id="productName"
            value={sku}
            onChange={inputChange}
          />
        </div>
        <Button color="bright" disabled={searching}>
          Search
        </Button>
      </form>
    </div>
  );
}

SearchProduct.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searching: PropTypes.bool.isRequired,
};

export default SearchProduct;
