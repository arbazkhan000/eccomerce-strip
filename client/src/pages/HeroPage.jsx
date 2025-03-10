import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductData from "../Product.json";
import ProductsPage from "./ProductsPage";

const HeroPage = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchProduct, setSearchProduct] = useState(ProductData);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchInput(query);

        // Filter products
        const filteredItems = ProductData.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchProduct(filteredItems);
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-[#ECEEEF] min-h-[250px] md:min-h-[400px] my-5 max-w-5xl mx-auto rounded-xl flex flex-col md:flex-row items-center justify-center text-center md:text-left px-4 sm:px-6 lg:px-8">
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                        Adidas
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600">
                        Steel Metal Bottle 600 ML
                    </p>
                </div>
                <img
                    className="w-full md:w-1/2 max-h-[250px] sm:max-h-[300px] md:max-h-[350px] object-contain mt-6 md:mt-0"
                    src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/1105dc0c9232477eb80dac7d000edc0c_9366/Steel_Metal_Bottle_600_ML_White_EX7306_01_standard.jpg"
                    alt="Adidas Bottle"
                />
            </section>

            {/* Search Section */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto mt-5">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="border flex items-center rounded-xl py-2 px-4 bg-white shadow-sm"
                >
                    <input
                        value={searchInput}
                        onChange={handleSearch}
                        className="w-full p-2 outline-none text-sm sm:text-base"
                        placeholder="Search Here..."
                    />
                    <button
                        type="submit"
                        className="bg-[#E62E31] text-white px-4 py-2 rounded-xl text-sm sm:text-base hover:bg-[#C82326] transition-colors"
                    >
                        Search
                    </button>
                </form>
            </section>

            {/* Product Search Results */}
            {searchInput && (
                <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {searchProduct.map((product, index) => (
                            <div
                                key={index}
                                className="border rounded-xl p-4 bg-white shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() =>
                                    navigate(`/product/${product.id}`)
                                }
                            >
                                <p className="font-medium text-sm sm:text-base text-gray-800">
                                    {product.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* All Products */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-8">
                <ProductsPage />
            </section>
        </div>
    );
};

export default HeroPage;
