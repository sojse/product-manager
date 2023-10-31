import Button from "./Button.jsx";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories.js";

function AddCategoryForm() {
  const navigate = useNavigate();
  const categoriesContext = useCategories();

  const [form, setForm] = useState({
    name: "",
  });

  const [formValid, setFormValid] = useState({
    name: false,
  });

  function inputChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setFormValid({
      ...formValid,
      [name]: e.target.value.length > 0,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    categoriesContext.addCategory(form);
    navigate("/");
  }

  return (
    <div className="m-4">
      <Link to="/">
        <Button color={"light"}> Back to home</Button>
      </Link>
      <h2 className="text-2xl font-bold m-4">Create New Category</h2>

      <form className="m-6" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="block mb-2">
            Category Name
          </label>
          <input
            type="text"
            className={`border-2 rounded-md p-1 ${
              formValid.name ? "border-green-600" : ""
            }`}
            placeholder="Enter category name"
            name="name"
            id="categoryName"
            value={form.name}
            onChange={inputChange}
          />
        </div>
        <Button color={`${formValid.name ? "bright" : "disabled"}`}>Add</Button>
      </form>
    </div>
  );
}

export default AddCategoryForm;
