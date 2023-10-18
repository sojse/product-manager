import Button from "./Button.jsx";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProductForm({ onSubmit }) {
  const params = useParams();

  const [form, setForm] = useState({
    name: "",
    stockKeepingUnit: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  const [formValid, setFormValid] = useState({
    name: false,
    stockKeepingUnit: false,
    description: false,
    imageUrl: false,
    price: false,
  });

  const navigate = useNavigate();

  function inputChange(e) {
    switch (e.target.name) {
      case "imageUrl":
        const imageUrlRegex =
          /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp)$/i;

        setForm({
          ...form,
          imageUrl: e.target.value,
        });

        setFormValid({
          ...formValid,
          imageUrl: imageUrlRegex.test(e.target.value),
        });
        break;

      case "price":
        setForm({
          ...form,
          price: e.target.value,
        });

        setFormValid({
          ...formValid,
          price: e.target.value.length > 0 && !isNaN(e.target.value),
        });
        break;

      default:
        const { name, value } = e.target;

        setForm({
          ...form,
          [name]: value,
        });

        setFormValid({
          ...formValid,
          [name]: e.target.value.length > 0,
        });

        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    var confirmationMessage = "Are you sure you want to add " + form.name + "?";

    if (params.sku) {
      confirmationMessage =
        "Are you sure you want to update " + form.name + "?";
    }

    var confirmed = window.confirm(confirmationMessage);

    if (!confirmed) {
      return;
    }

    onSubmit(form);
    navigate("/");
  }

  return (
    <div className="m-4">
      <Link to="/">
        <Button color={"light"}> Back to home</Button>
      </Link>
      <h2 className="text-2xl font-bold m-4">
        {params.sku ? "Update Product" : "Add Product"}
      </h2>

      <form className="m-6" onSubmit={handleSubmit}>
        <div>
          <div className="mb-3">
            <label className="block mb-2">Product Name</label>
            <input
              type="text"
              className={`border-2 rounded-md p-1 ${
                formValid.name ? "border-green-600" : ""
              }`}
              placeholder="Enter product name"
              name="name"
              value={form.name}
              onChange={inputChange}
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2">Stock Keeping Unit (SKU)</label>
            <input
              type="text"
              className={`border-2 rounded-md p-1 ${
                formValid.stockKeepingUnit ? "border-green-600" : ""
              }`}
              placeholder="Enter SKU"
              name="stockKeepingUnit"
              value={params.sku ? params.sku : form.stockKeepingUnit}
              onChange={inputChange}
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2">Description</label>
            <input
              type="text"
              className={`border-2 rounded-md p-1 ${
                formValid.description ? "border-green-600" : ""
              }`}
              placeholder="Enter product description"
              name="description"
              value={form.description}
              onChange={inputChange}
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2">Image URL</label>
            <input
              type="text"
              className={`border-2 rounded-md p-1 ${
                formValid.imageUrl ? "border-green-600" : ""
              }`}
              placeholder="Enter image URL"
              name="imageUrl"
              value={form.imageUrl}
              onChange={inputChange}
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2">Price</label>
            <input
              type="text"
              className={`border-2 rounded-md p-1 ${
                formValid.price ? "border-green-600" : ""
              }`}
              placeholder="Enter price"
              name="price"
              value={form.price}
              onChange={inputChange}
            />
          </div>
        </div>

        <Button
          color={`${
            formValid.name &&
            formValid.stockKeepingUnit &&
            formValid.description &&
            formValid.imageUrl &&
            formValid.price
              ? "bright"
              : "disabled"
          }`}
        >
          {params.sku ? "Update" : "Add"}
        </Button>
      </form>
    </div>
  );
}

export default ProductForm;
