import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ProductData from "../Product.json";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { isSignedIn } = useUser();

    useEffect(() => {
        const fetchProductDetails = () => {
            const filterProduct = ProductData.find((p) => p.id === id);
            if (filterProduct) {
                setProduct(filterProduct);
            } else {
                console.warn("Product not found");
            }
            setLoading(false);
        };

        fetchProductDetails();
    }, [id]);


    const handleBuyNow = () => {
        if (!isSignedIn) {
            toast.error("Please login to proceed!");
            setTimeout(() => navigate("/"), 1000);
            return;
        }

        addToCart();
        navigate(`/checkout`);
    };

    const addToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(product);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        toast.success("Product Added to Cart");
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (!product) {
        return <div className="text-center mt-10">Product not found</div>;
    }

    const relatedProducts = ProductData.filter((p) => p.id !== id).slice(0, 4);

    return (
        <div className="text-center mt-10 text-[#374151] px-4">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
                {/* Left: Image */}
                <img
                    className="w-full max-w-[400px] rounded-xl"
                    src={product.img}
                    alt={product.name}
                    aria-label={product.name}
                />

                {/* Right: Details */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold py-5">
                        {product.name}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 py-4">
                        {product.description}
                    </p>

                    {/* Price & Buttons */}
                    <div className="p-2 flex flex-col sm:flex-row items-center gap-4 w-full">
                        <button
                            className="p-2 border w-full sm:w-1/2 bg-white text-lg font-semibold"
                            aria-label={`Price of ${product.name}`}
                        >
                            ₹{product.price}
                        </button>
                        
                        <button
                            className="p-2 w-full sm:w-1/2 text-white rounded-lg bg-[#E62E31] cursor-pointer transition hover:bg-[#c8262b]"
                            onClick={handleBuyNow}
                            aria-label={`Buy ${product.name} now`}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <section className="mt-10">
                <h2 className="text-xl sm:text-2xl font-semibold mb-5">
                    Related Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {relatedProducts.map((relatedProduct) => (
                        <div
                            key={relatedProduct.id}
                            className="border rounded-xl p-3 bg-white shadow-md cursor-pointer hover:bg-gray-200 transition"
                            onClick={() =>
                                navigate(`/product/${relatedProduct.id}`)
                            }
                        >
                            <img
                                className="w-full h-40 object-contain rounded-xl"
                                src={relatedProduct.img}
                                alt={relatedProduct.name}
                            />
                            <p className="font-medium text-sm mt-2">
                                {relatedProduct.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                ₹{relatedProduct.price}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProductDetails;
