import { useUser } from "@clerk/clerk-react";
import React, { useState } from "react";

const ContactPage = () => {
    const { isSignedIn } = useUser();
    const [auth, setAuth] = useState({
        name: "",
        email: "",
        address: "",
    });

    // Handle input changes
    const ChangeHandler = (e) => {
        const { name, value } = e.target;
        setAuth((prevAuth) => ({
            ...prevAuth,
            [name]: value, // Update the specific field
        }));
    };

    // Handle form submission
    const formHandler = (e) => {
        e.preventDefault();

        // Log the form data (you can replace this with an API call)
        console.log("Form Data:", auth);

        // Reset the form
        setAuth({
            name: "",
            email: "",
            address: "",
        });

        alert("Message sent successfully!"); // Notify the user
    };

   

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            {/* Page Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
                Contact Us
            </h1>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Send Us a Message
                    </h2>
                    <form onSubmit={formHandler} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                value={auth.name}
                                onChange={ChangeHandler}
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                value={auth.email}
                                onChange={ChangeHandler}
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Address
                            </label>
                            <textarea
                                value={auth.address}
                                onChange={ChangeHandler}
                                id="address"
                                name="address"
                                rows="4"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your address"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                {/* Company Information and Map */}
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Our Information
                    </h2>
                    <div className="space-y-4 text-gray-700">
                        <p>
                            <strong>Address:</strong> 123 E-commerce Street,
                            City, Country
                        </p>
                        <p>
                            <strong>Phone:</strong> +1 (123) 456-7890
                        </p>
                        <p>
                            <strong>Email:</strong> quickcart@ecommerce.com
                        </p>
                        <p>
                            <strong>Working Hours:</strong> Mon - Fri, 9:00 AM -
                            6:00 PM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
