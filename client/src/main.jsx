import { ClerkProvider } from "@clerk/clerk-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import "./index.css";
import {
    CheckOutPage,
    ContactPage,
    ErrorPage,
    HeroPage,
    SuccessPage,
} from "./pages/ImportPage.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <HeroPage />,
            },
            {
                path: "product/:id",
                element: <ProductDetails />,
            },
            {
                path: "checkout",
                element: <CheckOutPage />,
            },

            {
                path: "contact",
                element: <ContactPage />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
    {
        path: "/success",
        element: <SuccessPage />,
    },
]);

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <Toaster position="top-center" />
            <RouterProvider router={router} />
        </ClerkProvider>
    </StrictMode>
);
