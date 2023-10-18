import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import { useState, useEffect } from "react";
import Product from "./Product.jsx";

function SearchProduct({ product, onSearch, onDelete }) {
  const [sku, setSku] = useState("");
  const [searching, setSearching] = useState(false);

  function inputChange(e) {
    setSku(e.target.value);
  }

  useEffect(() => {
    setSearching(false);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    setSearching(true);

    onSearch(sku);
  }

  return (
    <div className="m-4">
      <Link to="/">
        <Button color={"light"}> Back to home</Button>
      </Link>
      <div>
        <h2 className="text-2xl font-bold m-4">Search Product</h2>
        <form className="m-6" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-2">SKU</label>
            <input
              type="text"
              className="border-2 rounded-md p-1 "
              placeholder="Enter SKU"
              name="productName"
              value={sku}
              onChange={inputChange}
            />
          </div>
          <Button color="bright" disabled={searching}>
            Search
          </Button>
        </form>
      </div>
      <div>
        {searching && Object.keys(product).length === 0 && (
          <span className="text-1x1 font-bold m-4">Product not found</span>
        )}
        {Object.keys(product).length !== 0 && searching && (
          <Product product={product} onDelete={onDelete} />
        )}
      </div>
    </div>
  );
}

export default SearchProduct;
