import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/clerk-react";
import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/checkout", label: "Shop" },
        { path: "/contact", label: "Contact" },
    ];

    return (
        <div className="border-b bg-white shadow-md">
            <header className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 md:px-8">
                {/* Logo */}
                <p className="text-2xl font-bold">
                    <span className="text-[#E62E31]">Q</span>uick Cart
                </p>

                {/* Desktop Nav */}
                <ul className="hidden sm:flex items-center space-x-6 text-[#374151]">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.path}
                                className="hover:text-[#E62E31] transition"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Authentication Section */}
                <div className="flex items-center space-x-4">
                    <SignedIn>
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label="Cart"
                                    labelIcon={<ShoppingCart />}
                                    href="/checkout"
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>

                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                </div>
            </header>
        </div>
    );
};

export default Header;
