import { useContext } from "react";
import CategoriesContext from "../context/CategoriesContext";


const useCategories = () => {
    return useContext(CategoriesContext);
}

export default useCategories;