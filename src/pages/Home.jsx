import PropertyList from "../components/PropertyList";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Footer from "../components/Footer";

export default function Home() {
    const { user } = useContext(AuthContext);
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <PropertyList userId={user.id} />
            <Footer />
        </div>
    );
}
