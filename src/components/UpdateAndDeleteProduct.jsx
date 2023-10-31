import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import { useState } from "react";
import Product from "./Product.jsx";
import SearchProduct from "./SearchProduct.jsx";
import useProduct from "../hooks/useProduct.js";

function UpdateAndDeleteProduct() {
  const productContext = useProduct();
  const [searching, setSearching] = useState(false);

  const onSearch = (sku) => {
    setSearching(true);
    productContext.onSearch(sku);
  };

  const onDelete = (product) => {
    productContext.onDelete(product);
  };

  return (
    <div className="m-4">
      <Link to="/">
        <Button color={"light"}> Back to home</Button>
      </Link>
      <SearchProduct
        onSearch={onSearch}
        searching={searching}
        title={"Search Product"}
      />
      <div>
        {searching && Object.keys(productContext.foundProduct).length === 0 && (
          <span className="text-1x1 font-bold m-4">Product not found</span>
        )}
        {Object.keys(productContext.foundProduct).length !== 0 && searching && (
          <Product product={productContext.foundProduct} onDelete={onDelete} />
        )}
      </div>
    </div>
  );
}

export default UpdateAndDeleteProduct;
