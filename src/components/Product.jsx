import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

function Product({ onDelete }) {
  const product = {
    productName: "Sample Product",
    sku: "ABC123",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 19.99,
    imageUrl:
      "https://www.na-kd.com/resize/globalassets/v-detailed_light_rib_knitted_sweater-1100-005027-0005_0232.jpg?ref=1E44A12627&quality=80&sharpen=0.3&width=846",
  };
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    onDelete(product);
    navigate("/");
  }

  return (
    <div className="max-w-sm shadow-lg">
      <img
        className="w-full h-80 object-cover"
        src={product.imageUrl}
        alt={product.productName}
      />
      <div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.productName}</div>
          <p className="text-gray-700 text-base">{product.description}</p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            SKU: {product.sku}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-11">
            Price: ${product.price}
          </span>
          <Button handleSubmit={handleClick} color={"dark"}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Product;
