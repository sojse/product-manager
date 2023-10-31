import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import CategoriesContext from "../context/CategoriesContext";

function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [categoryInformationMessage, setCategoryInformationMessage] =
    useState("");
  const axiosPrivate = useAxiosPrivate();
  const PRODUCTS_URL = "/products";
  const CATEGORIES_URL = "/categories";

  const addCategory = async (category) => {
    try {
      const response = await axiosPrivate.post(
        CATEGORIES_URL,
        JSON.stringify(category),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setCategoryInformationMessage(
        `${response.data.name} was added as a new category`
      );
    } catch (error) {
      setCategoryInformationMessage("Couldn't add category");
    }
  };

  const onAddProductToCategory = async (selectedCategory, product) => {
    try {
      await axiosPrivate.post(
        `${CATEGORIES_URL}/${selectedCategory}${PRODUCTS_URL}`,
        product
      );
      setCategoryInformationMessage("Product was added to category");
    } catch (error) {
      setCategoryInformationMessage("Couldn't add product to category");
    }
  };

  const getCategories = async () => {
    try {
      const response = await axiosPrivate.get(CATEGORIES_URL);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories: categories,
        categoryInformationMessage: categoryInformationMessage,
        setCategoryInformationMessage: setCategoryInformationMessage,
        addCategory: addCategory,
        onAddProductToCategory: onAddProductToCategory,
        getCategories: getCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesProvider;
