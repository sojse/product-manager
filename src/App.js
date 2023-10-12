import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import AddProductForm from "./components/AddProductForm";
import SearchProduct from "./components/SearchProduct";
import "./App.css";

export default function App() {
  const [informationMessage, setInformationMessage] = useState("");


  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch("https://localhost:8000/products")
      .then(resp => resp.json())
      .then(products => setProducts(products));

  }, []);

  const onAdd = (product) => {
      console.log(product);
    /*
    fetch("https://localhost:8000/products", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product),
    })
    .then(resp => resp.json())
    .then(data => console.log(data));*/
    setMessage(`${product.productName} was added`);

  }

  const onSearch = (sku) => {
    console.log(sku);
    // search in the database
  }

  const onDelete = (product) => {

    var confirmed = window.confirm(
      "Are you sure you want to delete " + product.productName + "?"
    );

    if (!confirmed) {
      return;
    }
    console.log(product)
    setMessage(`${product.productName} was deleted`);
    // delete the product
  }

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
        <Route path="/add-product" element={<AddProductForm onAdd={onAdd}/>} />
        <Route path="/search-product" element={<SearchProduct onSearch={onSearch} onDelete={onDelete}/>} />
      </Routes>
      <section>
        <div className="text-2xl font-bold m-4 text-center">{informationMessage}</div>
      </section>
    </>

  );
}