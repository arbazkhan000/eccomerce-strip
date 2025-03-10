import { useUser } from "@clerk/clerk-react";
import { loadStripe } from "@stripe/stripe-js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const QuantitySelector = ({ quantity, onIncrement, onDecrement }) => (
    <div className="flex items-center gap-3">
        <button
            className="p-1 border rounded bg-gray-200 hover:bg-gray-300"
            onClick={onDecrement}
            aria-label="Decrease quantity"
        >
            <ChevronLeft size={16} />
        </button>
        <span>{quantity}</span>
        <button
            className="p-1 border rounded bg-gray-200 hover:bg-gray-300"
            onClick={onIncrement}
            aria-label="Increase quantity"
        >
            <ChevronRight size={16} />
        </button>
    </div>
);

const CheckOutPage = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const [quantities, setQuantities] = useState(
        cartItems.reduce((acc, item) => {
            acc[item.id] = 1;
            return acc;
        }, {})
    );
    const [selectedAddress, setSelectedAddress] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const { isSignedIn } = useUser();

    const handleIncrement = (itemId) => {
        setQuantities((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + 1,
        }));
    };

    const handleDecrement = (itemId) => {
        setQuantities((prev) => ({
            ...prev,
            [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 1,
        }));
    };

    const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value);
    };

    const removeItem = (itemId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        window.location.reload();
    };

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * quantities[item.id],
            0
        );
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please select an address.");
            return;
        }

        if (!isSignedIn) {
            toast.error("Please login to proceed");
            return;
        }

        setIsProcessing(true);

        try {
            const stripe = await stripePromise;
            const backendUrl = "http://localhost:2222/order";

            const response = await fetch(backendUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartItems.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: quantities[item.id],
                    })),
                    address: selectedAddress,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || "Payment processing failed"
                );
            }

            const session = await response.json();

            if (session.id) {
                const { error } = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });

                if (error) {
                    throw new Error(error.message);
                }
            }
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error("Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-10 p-5 text-[#374151]">
            {cartItems.length > 0 ? (
                <>
                    <section className="w-full lg:w-2/3">
                        <header className="w-full flex justify-between text-xl sm:text-2xl my-5 border-b-2 border-gray-200">
                            <h2>Your Cart</h2>
                            <p>{cartItems.length} Item(s)</p>
                        </header>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="bg-gray-100 border-b text-sm sm:text-base">
                                        <th className="p-3">Product Details</th>
                                        <th className="p-3">Price</th>
                                        <th className="p-3">Quantity</th>
                                        <th className="p-3">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-4 px-3 flex items-center gap-4">
                                                <img
                                                    className="h-16 w-16 object-contain rounded-sm"
                                                    src={item.img}
                                                    alt={item.name}
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-sm sm:text-base">
                                                        {item.name}
                                                    </h3>
                                                    <p
                                                        className="text-red-500 cursor-pointer hover:underline text-xs sm:text-sm"
                                                        onClick={() =>
                                                            removeItem(item.id)
                                                        }
                                                    >
                                                        Remove
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                ₹{item.price}
                                            </td>
                                            <td className="p-3">
                                                <QuantitySelector
                                                    quantity={
                                                        quantities[item.id]
                                                    }
                                                    onIncrement={() =>
                                                        handleIncrement(item.id)
                                                    }
                                                    onDecrement={() =>
                                                        handleDecrement(item.id)
                                                    }
                                                />
                                            </td>
                                            <td className="p-3 font-semibold">
                                                ₹
                                                {item.price *
                                                    quantities[item.id]}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <aside className="bg-gray-100 w-full lg:w-1/3 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4">
                            Order Summary
                        </h2>

                        <div className="mb-4p-1 border border-solid border-black ">
                            <textarea
                                placeholder="Address:"
                                value={selectedAddress}
                                onChange={handleAddressChange}
                                className="w-full p-2 outline-none "
                                name="address"
                                id="address"
                                cols={5}
                                rows={5}
                                required
                            ></textarea>
                        </div>

                        <hr className="my-4" />

                        <div className="space-y-2 text-sm sm:text-base">
                            <div className="flex justify-between">
                                <span className="font-medium">Price</span>
                                <span>₹{calculateTotal()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">
                                    Shipping Fee
                                </span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Tax (2%)</span>
                                <span>
                                    ₹{(calculateTotal() * 0.02).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <hr className="my-4" />

                        <div className="flex justify-between text-lg sm:text-xl font-bold">
                            <span>Total</span>
                            <span>
                                ₹
                                {(
                                    calculateTotal() +
                                    calculateTotal() * 0.02
                                ).toFixed(2)}
                            </span>
                        </div>

                        <button
                            className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition disabled:bg-red-300"
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                        >
                            {isProcessing ? "Processing..." : "Place Order"}
                        </button>
                    </aside>
                </>
            ) : (
                <div className="w-full text-center py-10">
                    <h1 className="text-2xl font-semibold mb-4">
                        Your cart is empty
                    </h1>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </button>
                </div>
            )}
        </div>
    );
};

export default CheckOutPage;
