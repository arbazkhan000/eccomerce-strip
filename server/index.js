import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";

dotenv.config();
const app = express();
const port = process.env.PORT || 2222;

// Ensure Stripe key exists
if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Error: STRIPE_SECRET_KEY is not defined in .env file.");
    process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Order Route
app.post("/order", async (req, res, next) => {
    try {
        const { items, address } = req.body;

        // Validate request data
        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty.",
            });
        }

        if (!address || address.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Address is required.",
            });
        }

        // Validate items format
        for (const item of items) {
            if (!item.id || !item.name || !item.price || !item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid item format in cart.",
                });
            }
        }

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map((item) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.round(item.price * 100), // Convert to paise
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/error`,
            metadata: {
                address: address.slice(0, 450), // Ensure safe truncation
            },
        });

        res.status(200).json({
            success: true,
            id: session.id,
        });
    } catch (error) {
        console.error("Stripe Error:", error);

        if (error.type === "StripeCardError") {
            return res.status(400).json({
                success: false,
                message:
                    "Your card was declined. Please try a different payment method.",
            });
        }

        next(error); // Pass to global error handler
    }
});

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({ success: true, error: false });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.message || err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error. Please try again later.",
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
