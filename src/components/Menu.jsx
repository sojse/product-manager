import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Menu() {
  const userAuth = useAuth();

  const renderAuthenticatedMenu = () => {
    if (userAuth.signedIn && userAuth.auth.roles.includes("Administrator")) {
      return (
        <div>
          <ul className="flex">
            <li className="mr-6">
              <Link to="/product-form" className="hover:text-gray-300">
                New Product
              </Link>
            </li>
            <li className="mr-6">
              <Link to="/search-product" className="hover:text-gray-300">
                Search Product
              </Link>
            </li>
            <li className="mr-6">
              <Link to="/add-category" className="hover:text-gray-300">
                Add Category
              </Link>
            </li>
            <li className="mr-6">
              <Link
                to="/add-product-to-category"
                className="hover:text-gray-300"
              >
                Add Product to Category
              </Link>
            </li>
            <li className="mr-6">
              <Link to="/categories-table" className="hover:text-gray-300">
                List Categories
              </Link>
            </li>
          </ul>
        </div>
      );
    } else if (userAuth.signedIn && userAuth.auth.roles.includes("User")) {
      return (
        <div>
          <ul className="flex">
            <li className="mr-6">
              <Link to="/search-product" className="hover:text-gray-300">
                Search Product
              </Link>
            </li>
            <li className="mr-6">
              <Link to="/categories-table" className="hover:text-gray-300">
                List Categories
              </Link>
            </li>
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 text-white p-4">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold mb-4">Product Manager</h1>
      </Link>
      <div className="flex justify-between">
        <div>{renderAuthenticatedMenu()}</div>
        <div className="hover:text-gray-300 cursor-pointer">
          {!userAuth.signedIn ? (
            <Link to={"/login"}>Sign in</Link>
          ) : (
            <span onClick={userAuth.signOut}>Sign out</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
