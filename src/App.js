import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import ProductForm from "./components/ProductForm";
import SearchProduct from "./components/SearchProduct";
import "./App.css";

export default function App() {
  const [informationMessage, setInformationMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [foundProduct, setFoundProduct] = useState({});

  useEffect(() => {

    fetch("https://localhost:8000/products")
      .then(resp => resp.json())
      .then(products => setProducts(products))
      .catch(err => console.log(err));

  }, []);

  const onAdd = (product) => {
    
    fetch("https://localhost:8000/products", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product),
    })
    .then(resp => resp.json())
    .then(data => setProducts([...products, data]));
    setMessage(`${product.name} was added`);

  }

  const onUpdate = (product) => {
    console.log(JSON.stringify(product));
    
    fetch(`https://localhost:8000/products/${product.stockKeepingUnit}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product),
    })
    .then(resp => setMessage(`${product.name} was updated`))
    
    
  }

  const onSearch = (stockKeepingUnit) => {
    fetch(`https://localhost:8000/products/${stockKeepingUnit}`)
      .then((resp) => {
        if (!resp.ok) {
          // Handle non-successful response (e.g., 404)
          setFoundProduct({});
          throw new Error(`Product not found: ${resp.status}`);
        }
        return resp.json();
      })
      .then((product) => setFoundProduct(product))
      .catch((err) => {
        console.error(err);
      });
  };


  const onDelete = async (product)  => {

    var confirmed = window.confirm(
      "Are you sure you want to delete " + product.name + "?"
    );

    if (!confirmed) {
      return;
    }
    
    try {
      await fetch(`https://localhost:8000/products/${product.stockKeepingUnit}`, {
        method: "delete",
      });
      const newProducts = products.filter((x) => x.id !== product.id);

      setProducts(newProducts);
      setFoundProduct({});
      setMessage(`${product.name} was deleted`);

    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const setMessage = (message) => {
    setInformationMessage(message);

    setTimeout(() => {
      setInformationMessage("");
    }, 2000)
  }


  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/add-product" element={<ProductForm onSubmit={onAdd}/>} />
        <Route path="/add-product/:sku" element={<ProductForm onSumbit={onUpdate}/>} />
        <Route path="/search-product" element={<SearchProduct onSearch={onSearch} onDelete={onDelete} product={foundProduct}/>} />

      </Routes>
      <section>
        <div className="text-2xl font-bold m-4 text-center">{informationMessage}</div>
      </section>
    </>

  );
}