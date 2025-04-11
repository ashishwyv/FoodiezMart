import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import ProductCard from "../Components/Card";
import Navigation from "../Components/Navigation";

const FoodExplorer = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
//   const scrollContainerRef = useRef(null);

  const visibleRange = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&page=${page}&page_size=20&json=true`
      );
      let newProducts = res.data.products || [];

      if (newProducts.length === 0 && /^\d{8,13}$/.test(searchTerm)) {
        const barcodeRes = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${searchTerm}.json`
        );
        if (barcodeRes.data.status === 1 && barcodeRes.data.product) {
          newProducts = [barcodeRes.data.product];
        }
      }

      setProducts((prev) => (page === 1 ? newProducts : [...prev, ...newProducts]));
      setHasMore(newProducts.length > 0);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  const getCardScale = (index) => {
    const middle = Math.floor(visibleRange / 2);
    const diff = Math.abs(index - middle);
    if (diff === 0) return "scale-[1.71] z-30 -mt-6";
    if (diff === 1) return "scale-[1.35] z-20 -mt-12";
    return "scale-100 z-10 -mt-16 opacity-80";
  };

  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const scrollRight = () => {
    if (startIndex + visibleRange < products.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + visibleRange);
  const centerCard = visibleProducts[Math.floor(visibleRange / 2)];

  const getBgColor = (grade) => {
    switch ((grade || "").toLowerCase()) {
      case "a": return "from-green-100 via-white to-green-200";
      case "b": return "from-lime-100 via-white to-lime-200";
      case "c": return "from-yellow-100 via-white to-yellow-200";
      case "d": return "from-orange-100 via-white to-orange-200";
      case "e": return "from-rose-100 via-white to-rose-200";
      default: return "from-gray-100 via-white to-gray-200";
    }
  };

  const bgGradient = getBgColor(centerCard?.nutrition_grades);

  return (
    
    <div className={`min-h-screen w-full bg-gradient-to-br ${bgGradient} text-gray-800`}>
    <Navigation/>
      {/* Welcome Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="text-center mb-10">
          <h1 className="text-6xl md:text-7xl font-bold uppercase tracking-wider italic drop-shadow-lg">
            <span className="text-gray-900">Foodiez</span>
            <span className="text-blue-600">Mart</span>
          </h1>
          <p className="mt-6 text-2xl md:text-3xl font-medium italic">
            WELCOMES YOU 👋
          </p>
          <p className="mt-6 text-2xl md:text-3xl font-medium italic">
            <span className="text-gray-900">A place where you can WORRY less,</span>
            <span className="text-blue-600"> SHOP more</span>
          </p>
        </div>
      </section>

      {/* Explorer Section */}
      <section id="productList">
      <div className="p-4">
        <h1 className="text-2xl md:text-3xl font-medium italic mb-5"><span className="text-gray-900">Food Product</span>
        <span className="text-blue-600"> Explorer</span></h1>
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product, idx) => (
            <ProductCard key={`${product.code}-${idx}`} product={product} />
          ))}
        </div>
        <div ref={loader} className="text-center p-6 text-gray-500">
          {hasMore ? "Loading more..." : "No more products"}
        </div>
      </div>
      </section>
    </div>
  );
};

export default FoodExplorer;
