import { useEffect } from "react";
import useCategories from "../hooks/useCategories";
import useProduct from "../hooks/useProduct";

function InformationMessageView() {
  const { categoryInformationMessage, setCategoryInformationMessage } =
    useCategories();
  const { productInformationMessage, setProductInformationMessage } =
    useProduct();

  useEffect(() => {
    return () => {
      setCategoryInformationMessage("");
      setProductInformationMessage("");
    };
  }, [setCategoryInformationMessage, setProductInformationMessage]);

  return (
    <>
      <div className="text-1x1 font-bold m-4 text-center">
        {categoryInformationMessage
          ? categoryInformationMessage
          : productInformationMessage}
      </div>
    </>
  );
}

export default InformationMessageView;
