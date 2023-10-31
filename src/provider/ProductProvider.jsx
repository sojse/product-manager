import ProductContext from "../context/ProductContext";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function ProductProvider({ children }) {
  const [foundProduct, setFoundProduct] = useState({});
  const [productInformationMessage, setProductInformationMessage] =
    useState("");
  const axiosPrivate = useAxiosPrivate();
  const PRODUCTS_URL = "/products";

  const onAdd = async (product) => {
    try {
      const response = await axiosPrivate.post(
        PRODUCTS_URL,
        JSON.stringify(product),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setProductInformationMessage(`${response.data.name} was added`);
    } catch (error) {
      setProductInformationMessage("Couldn't add the product");
    }
  };

  const onSearch = async (stockKeepingUnit) => {
    try {
      const response = await axiosPrivate.get(
        `${PRODUCTS_URL}/${stockKeepingUnit}`
      );
      setFoundProduct(response.data);
    } catch {
      setFoundProduct({});
    }
  };

  const onUpdate = async (product) => {
    try {
      await axiosPrivate.put(
        `${PRODUCTS_URL}/${product.stockKeepingUnit}`,
        JSON.stringify(product),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setProductInformationMessage("The product was updated");
    } catch {
      setProductInformationMessage("Couldn't update product");
    }
  };

  const onDelete = async (product) => {
    try {
      await axiosPrivate.delete(`${PRODUCTS_URL}/${product.stockKeepingUnit}`);
      setFoundProduct({});
      setProductInformationMessage("The product was deleted");
    } catch {
      setProductInformationMessage("Couldn't delete product");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        foundProduct: foundProduct,
        productInformationMessage: productInformationMessage,
        setProductInformationMessage: setProductInformationMessage,
        onAdd: onAdd,
        onUpdate: onUpdate,
        onSearch: onSearch,
        onDelete: onDelete,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
