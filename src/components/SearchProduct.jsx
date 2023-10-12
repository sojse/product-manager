import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import { useState } from "react";
import Product from "./Product.jsx";

function SearchProduct({ onSearch, onDelete }) {
  const [sku, setSku] = useState("");
  const [productNotFound, setProductNotFound] = useState(false);

  function inputChange(e) {
    setSku(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
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
          <Button color="bright">Search</Button>
        </form>
      </div>
      <div>
        {productNotFound ? (
          <span className="text-1x1 font-bold m-4">Produkt finns ej</span>
        ) : (
          <Product onDelete={onDelete} />
        )}
      </div>
    </div>
  );
}

export default SearchProduct;
