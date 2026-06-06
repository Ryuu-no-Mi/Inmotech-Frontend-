import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

export default function Property() {
    const { id } = useParams();
    const [prop, setProp] = useState(null);

    useEffect(() => {
        api.get(`/property/${id}`).then((r) => setProp(r.data));
    }, [id]);

    if (!prop) return <p>Cargando...</p>;
    return (
        <div>
            <h1>{prop.titulo}</h1>
            <p>{prop.descripcion}</p>
            <h3>Agencia: {prop.agencia?.nombre}</h3>
            <h4>Agentes:</h4>
            <ul>
                {prop.agencia?.unidadAgentes?.map((a) => (
                    <li key={a.id}>{a.nombre}</li>
                ))}
            </ul>
        </div>
    );
}
