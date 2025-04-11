import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${id}.json`);
        if (res.data.status === 1) {
          setProduct(res.data.product);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="p-10 text-center text-lg">Loading product details...</div>;
  }

  const getNutriColor = (grade) => {
    switch ((grade || "").toLowerCase()) {
      case "a":
        return "text-green-600 border-green-600";
      case "b":
        return "text-lime-600 border-lime-600";
      case "c":
        return "text-yellow-600 border-yellow-600";
      case "d":
        return "text-orange-600 border-orange-600";
      case "e":
        return "text-red-600 border-red-600";
      default:
        return "text-gray-600 border-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-8 md:px-12">
      <button
  onClick={() => navigate(-1)}
  className="flex items-center gap-2 text-blue-600 font-semibold hover:underline mb-6"
>
  ← Back
</button>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex justify-center items-center">
          <img
            src={product.image_front_url || "https://via.placeholder.com/300"}
            alt={product.product_name}
            className="w-full max-w-xs rounded-xl shadow-md object-cover"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.product_name || "Unnamed Product"}</h1>

          <div className="text-lg text-gray-600">
            <p><span className="font-semibold">Brand:</span> {product.brands || "Unknown"}</p>
            <p><span className="font-semibold">Categories:</span> {product.categories || "N/A"}</p>
            <p><span className="font-semibold">Quantity:</span> {product.quantity || "N/A"}</p>
            <p><span className="font-semibold">Ingredients:</span> {product.ingredients_text || "Not listed"}</p>
          </div>

          <div>
            <p className="text-lg font-semibold mb-1">Nutri-Score:</p>
            <span
              className={`inline-block px-4 py-1 text-lg border-2 rounded-full font-bold ${getNutriColor(product.nutrition_grades)}`}
            >
              {product.nutrition_grades?.toUpperCase() || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
