import React, { useState } from "react";
import ProductData from "../Product.json";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
    const [products, setProducts] = useState(ProductData);

    return (
        <div className="mt-10 max-w-7xl mx-auto px-4 overflow-hidden">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#374151] mb-6 text-center font-semibold">
                Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
