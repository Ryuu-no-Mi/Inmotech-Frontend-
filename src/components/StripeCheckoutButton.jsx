import { useState } from "react";
import { api } from "../api";

export default function StripeCheckoutButton({ onSuccess, onCancel }) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await api.post("/stripe/create-checkout-session", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const sessionId = res.data.sessionId;
            window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
        } catch (err) {
            console.error("Error creando sesion de pago:", err);
            alert("Error al iniciar el pago. Intentalo de nuevo.");
            setLoading(false);
        }
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