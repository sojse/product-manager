import Button from "./Button.jsx";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useCategories from "../hooks/useCategories.js";

function CategoriesTable() {
  const categoriesContext = useCategories();

  useEffect(() => {
    categoriesContext.getCategories();
  }, [categoriesContext]);

  return (
    <div className="m-4">
      <Link to="/">
        <Button color={"light"}> Back to home</Button>
      </Link>
      <h2 className="text-2xl font-bold m-4">Categories</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Products
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categoriesContext.categories.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {category.name} ({category.products.length} products)
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {category.products.map((product) => (
                  <div key={product.id} className="text-sm text-gray-500">
                    {product.name} - {product.price} SEK
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriesTable;
