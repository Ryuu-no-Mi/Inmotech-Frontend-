import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import BtnVolver from "../components/BtnInicio";

export default function AgencyDetail() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const [myProperties, setMyProperties] = useState([]);
    const [agency, setAgency] = useState(null);

    useEffect(() => {
        const agencyId = id || user?.idAgencia;

        if (!agencyId) return;

        // Cargar propiedades
        fetch("http://localhost:8080/api/property")
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar propiedades");
                return res.json();
            })
            .then((data) => {
                const filtradas = data.filter(
                    (p) => p.idAgencia === parseInt(agencyId)
                );
                setMyProperties(filtradas);
            })
            .catch((err) => console.error("Error al cargar propiedades:", err));

        // Cargar agencia
        fetch(`http://localhost:8080/api/agency/${agencyId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar agencia");
                return res.json();
            })
            .then((data) => setAgency(data))
            .catch((err) => console.error("Error al cargar agencia:", err));
    }, [id, user?.idAgencia]);

    if (!id && !user?.idAgencia) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-600">
                    No estás vinculado a ninguna agencia y no se especificó una
                    agencia.
                </p>
            </div>
        );
    }
    

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Agencia */}
            {agency && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Agencia
                    </h2>
                    <p>
                        <strong>Nombre:</strong> {agency.nombre}
                    </p>
                    <p>
                        <strong>Descripción:</strong> {agency.descripcion}
                    </p>
                </div>
            )}

            {/* Propiedades de la agencia */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Propiedades de la agencia ({myProperties.length})
                </h2>
                {myProperties.length === 0 ? (
                    <p className="text-gray-600">
                        No hay propiedades en tu agencia.
                    </p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {myProperties.map((prop) => (
                            <div
                                key={prop.id}
                                className="cursor-pointer border rounded shadow p-4 bg-gray-50 hover:bg-gray-100"
                                onClick={() => navigate(`/property/${prop.id}`)}
                            >
                                <h3 className="text-lg font-bold">
                                    {prop.titulo}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {prop.direccion}, {prop.ciudad}
                                </p>
                                <p className="text-indigo-600 font-semibold mt-2">
                                    €{prop.precio.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <BtnVolver />
        </div>
    );
}
