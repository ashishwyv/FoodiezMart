import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
    const navigate = useNavigate();
    const gotohome = () => {
        navigate("/");
    }
    const scrollToProducts = () => {
        const section = document.getElementById("productList");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      };
      const goToCategories = () => {
        navigate("/category/beverages"); 
      };
      const gotosearch = () => {
        navigate("/search")
      }
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      
      <div className="text-3xl font-bold text-blue-600 tracking-wide italic">
        <span className="text-gray-800 ml-4">Foodiez</span><span className="text-blue-500">Mart</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto justify-end">
        <div className="flex gap-6 font-semibold text-lg">
          <a onClick={gotohome} className="hover:text-blue-500 transition">Home</a>
          <a onClick={scrollToProducts} className="hover:text-blue-500 transition">Products</a>
          <a onClick={goToCategories} className="hover:text-blue-500 transition">Catagories</a>
        </div>
          <button onClick={gotosearch} className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 mr-5">
            Search
          </button>
        </div>
    </nav>
  );
};

export default Navigation;
