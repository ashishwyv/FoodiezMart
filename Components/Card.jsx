import { useNavigate } from "react-router-dom";



const ProductCard = ({ product }) => {
  const navigate = useNavigate();

const gotodetails = () => {
  navigate(`/product/${product.code}`);
}
  return (
    <div onClick={gotodetails} className="w-72 p-7 m-7 bg-gradient-to-br from-amber-100 via-white to-rose-100 border border-gray-200 shadow-xl rounded-2xl flex-shrink-0 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="w-32 h-32 mb-4">
        <img
          src={product.image_front_small_url || "https://via.placeholder.com/100"}
          alt={product.product_name}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      <h2 className="text-lg font-bold text-center text-gray-800 mb-1">
        {product.product_name || "Unnamed Product"}
      </h2>
      <p className="text-sm text-gray-600 text-center mb-1">
        <span className="font-medium">Category:</span>{" "}
        {product.categories_tags?.[0]?.split(":")[1] || "N/A"}
      </p>
      <p className="text-sm text-center text-gray-700">
        <span className="font-medium">Nutrition Grade:</span>{" "}
        <span className="text-gray-900 font-bold">
          {product.nutrition_grades?.toUpperCase() || "N/A"}
        </span>
      </p>
    </div>
  );
};

export default ProductCard;
