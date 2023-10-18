import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import ProductForm from "./components/ProductForm";
import SearchProduct from "./components/SearchProduct";
import "./App.css";

export default function App() {
  const [informationMessage, setInformationMessage] = useState("");
  const [foundProduct, setFoundProduct] = useState({});

  const onAdd = (product) => {
    
    fetch("https://localhost:8000/products", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product),
    })
    .then(response => {
      if(!response.ok) {
        throw new Error();
      }
      response.json()
    })
    .then(data => {
      setMessage(`${product.name} was added`);
    })
    .catch(error => {
      setMessage("Couldn't add product")
    })
    

  }

  const onUpdate = (product) => {
    fetch(`https://localhost:8000/products/${product.stockKeepingUnit}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product),
    })
    .then(response => {
      if(!response.ok) {
        throw new Error();
      }
      setMessage(`${product.name} was updated`)
    })
    .catch(error => {
      setMessage("Couldn't update product")
    })
    
    
  }

  const onSearch = async (stockKeepingUnit) => {
    
    fetch(`https://localhost:8000/products/${stockKeepingUnit}`)
      .then((response) => {
        
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then((product) => setFoundProduct(product))
      .catch((error) => {
        setFoundProduct({});
      });
  };


  const onDelete = async (product)  => {

    var confirmed = window.confirm(
      "Are you sure you want to delete " + product.name + "?"
    );

    if (!confirmed) {
      return;
    }
    
      fetch(`https://localhost:8000/products/${product.stockKeepingUnit}`, {
        method: "delete",
      })
      .then(response => {
        if(!response.ok) {
          throw new Error()
        }

        setFoundProduct({});
        setMessage(`${product.name} was deleted`);

      })
      .catch ((error) => {
        setMessage("Couldn't delete product");
      });
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
        <Route path="/add-product/:sku" element={<ProductForm onSubmit={onUpdate}/>} />
        <Route path="/search-product" element={<SearchProduct onSearch={onSearch} onDelete={onDelete} product={foundProduct}/>} />

      </Routes>
      <section>
        <div className="text-2xl font-bold m-4 text-center">{informationMessage}</div>
      </section>
    </>

  );
}