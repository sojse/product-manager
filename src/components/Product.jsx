import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

function Product({ product, onDelete }) {
  const navigate = useNavigate();

  function handleDelete(e) {
    onDelete(product);
    navigate("/");
  }

  function handleUpdate(e) {
    navigate(`/add-product/${product.stockKeepingUnit}`);
  }

  return (
    <div className="max-w-md p-6 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {product.name}
      </h5>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {product.description}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {product.imageURL}
      </p>
      <div className="flex justify-between items-center gap-1">
        <span className="inline-block bg-gray-200 rounded-full px-1 py-1 text-sm font-semibold text-gray-700 mr-2">
          SKU: {product.stockKeepingUnit}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Price: ${product.price}
        </span>

        <Button handleSubmit={handleDelete} color={"dark"}>
          Delete
        </Button>
        <Button handleSubmit={handleUpdate} color={"bright"}>
          Update
        </Button>
      </div>
    </div>
  );
}

export default Product;
