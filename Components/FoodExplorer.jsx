import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import ProductCard from "../Components/Card";
import Navigation from "../Components/Navigation";

const FoodExplorer = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);

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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMore]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  return (

    <div className={`min-h-screen w-full bg-gradient-to-br from-amber-100 via-white to-rose-100 border border-gray-200 text-gray-800`}>
      <Navigation />
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
