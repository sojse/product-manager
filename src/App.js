import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import ProductForm from "./components/ProductForm";
import "./App.css";
import AddCategoryForm from "./components/AddCategoryForm";
import AddProductToCategory from "./components/AddProductToCategory";
import CategoriesTable from "./components/CategoriesTable";
import Login from "./components/LoginForm";
import UpdateAndDeleteProduct from "./components/UpdateAndDeleteProduct";
import Missing from "./components/Missing";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import InformationMessageView from "./components/InformationMessageView";

export default function App() {

  return (
    <>
      <Menu />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Layout/>} />
        <Route index element={<InformationMessageView />} />
        <Route path="/login" element={<Login/>} />

        {/* routes accessed with login */}
        <Route element={<RequireAuth allowedRoles={["User", "Administrator"]}/>} >
          <Route path="/search-product" element={<UpdateAndDeleteProduct />} />
          <Route path="/categories-table" element={<CategoriesTable/>} />
        </Route>
        
        {/* routes accessed with admin role */}
        <Route element={<RequireAuth allowedRoles={["Administrator"]}/>} >
          <Route path="/product-form" element={<ProductForm/>} />
          <Route path="/product-form/:sku" element={<ProductForm/>} />        
          <Route path="/add-category" element={<AddCategoryForm />} />
          <Route path="/add-product-to-category" element={<AddProductToCategory/>} />
        </Route>
        
        <Route path="*" element={<Missing/>} />
      </Routes>
    </>

  );
}