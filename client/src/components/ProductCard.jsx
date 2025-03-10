import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div
            className="h-[320px] w-full max-w-[250px] mx-auto px-2 shadow-md rounded-lg bg-white transition-transform duration-300 hover:scale-95 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
        >
            <img
                className="bg-[#EFF0F2] h-[200px] w-full object-contain rounded-xl"
                src={product.img}
                alt={product.name}
            />
            {/* Product Description */}
            <div className="text-[#374151] p-3">
                <h3 className="text-lg font-semibold truncate">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold block mt-1">
                        ₹{product.price}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click from triggering navigation
                            navigate(`/product/${product.id}`);
                        }}
                        className="w-full mt-2 py-2 hover:text-white rounded-lg hover:bg-[#E62E31] transition"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
