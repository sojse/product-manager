import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="bg-gray-800 text-white p-4">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold mb-4">Product Manager</h1>
      </Link>
      <ul className="flex">
        <li className="mr-6">
          <Link to="/add-product" className="hover:text-gray-300">
            New Product
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/search-product" className="hover:text-gray-300">
            Search Product
          </Link>
        </li>
        <li>
          <Link to="" className="hover:text-gray-300">
            Quit
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
