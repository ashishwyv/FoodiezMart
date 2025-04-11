import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../Components/Card";
import Navigation from "../Components/Navigation";

const Categories = () => {
  const { category } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(
          `https://world.openfoodfacts.org/category/${category}.json`
        );
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6 capitalize text-center">
          Products in "{category.replace(/-/g, " ")}"
        </h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {products.length > 0 ? (
              products.map((product, idx) => (
                <ProductCard key={`${product.code}-${idx}`} product={product} />
              ))
            ) : (
              <p className="text-center text-gray-600">No products found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
