import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/Card";
import Navigation from "../Components/Navigation";

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);

        try {
            const res = await axios.get(
                `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&page_size=20&json=true`
            );

            let fetchedProducts = res.data.products || [];
            if (fetchedProducts.length === 0 && /^\d{8,13}$/.test(query)) {
                const barcodeRes = await axios.get(
                    `https://world.openfoodfacts.org/api/v0/product/${query}.json`
                );
                if (barcodeRes.data.status === 1 && barcodeRes.data.product) {
                    fetchedProducts = [barcodeRes.data.product];
                }
            }

            setResults(fetchedProducts);
        } catch (err) {
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-100 via-white to-rose-100 border border-gray-200 text-gray-800">
            <Navigation />
            <div className="max-w-3xl mx-auto px-4 py-10">
                <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Search for food products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </form>

                {loading ? (
                    <p className="text-center text-lg text-gray-500">Searching...</p>
                ) : results.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-4">
                        {results.map((product, index) => (
                            <ProductCard key={`${product.code}-${index}`} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
