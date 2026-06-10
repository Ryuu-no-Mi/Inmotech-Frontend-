import { useState } from "react";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_dRmfZh2Da9Wd7Ik7PndIA00";

export default function StripeCheckoutButton({ onSuccess, onCancel }) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = () => {
        setLoading(true);
        window.location.href = STRIPE_PAYMENT_LINK;
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
            {loading ? "Redirigiendo a Stripe..." : "Suscribirse con Tarjeta"}
        </button>
    );
}