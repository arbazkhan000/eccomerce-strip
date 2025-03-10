import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount === 1) {
                    clearInterval(timer);
                    navigate("/");
                    return prevCount;
                }
                return prevCount - 1;
            });
        }, 1000); // 1 second delay

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
                {/* Checkmark Icon */}
                <svg
                    className="w-12 h-12 md:w-16 md:h-16 mx-auto text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>

                {/* Success Message */}
                <h1 className="text-xl md:text-2xl font-bold mt-4 text-gray-800">
                    Payment Successful!
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-2">
                    Thank you for your purchase. You will be redirected to the
                    home page shortly.
                </p>

                {/* Redirect Message */}
                <p className="text-xs md:text-sm text-gray-500 mt-4">
                    Redirecting in {count} seconds...
                </p>

                <p className="text-gray-600">
                    You will be automatically redirected to the home page.
                </p>
            </div>
        </div>
    );
};

export default SuccessPage;
