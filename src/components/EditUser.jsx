import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import BtnVolver from "./BtnInicio";

export default function EditProfile() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        telefono: "",
        fechaNacimiento: "",
        imagenUrl: "",
        imagenFile: null
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {

        console.log("fecha nac", user.fechaNacimiento);
        if (user) {
            const [dd, mm, yyyy] = user.fechaNacimiento.split("/");
            const isoDate = `${yyyy}/${mm}/${dd}`;

            setData({
                nombre: user.nombre || "",
                apellido: user.apellido || "",
                email: user.email || "",
                password: "",
                telefono: user.telefono || "",
                fechaNacimiento: isoDate,
                imagenUrl: user.imagenUrl || ""
            });
        }
    }, [user]);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const [yyyy, mm, dd] = data.fechaNacimiento.split("-");
            const fechaFormateada = `${dd}/${mm}/${yyyy}`;

      

            const userData = {
                ...data,
                fechaNacimiento: fechaFormateada,
            };

            if (!data.imagenFile) {
                delete userData.imagenUrl;
            }        

            delete userData.imagenFile;

            console.log("Enviando datos al backend:", userData);
            console.log("Imagen seleccionada:", data.imagenFile);

            const res = await fetch(
                `http://localhost:8080/api/user/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                    body: JSON.stringify(userData),
                }
            );

            const result = await res.text(); 
            
            console.log("Respuesta del backend:", result);
            
            if (!res.ok) throw new Error("Error al actualizar el perfil");
            

            if (data.imagenFile) {
                const formData = new FormData();
                formData.append("file", data.imagenFile);

                try {
                    const imgRes = await fetch(
                        `http://localhost:8080/api/imageUser/${user.id}`,
                        {
                            method: "POST",
                            body: formData,
                            headers: {
                                Authorization:
                                    "Bearer " + localStorage.getItem("token"),
                            },
                        }
                    );

                    if (!imgRes.ok) {
                        const errorText = await imgRes.text();
                        throw new Error(
                            "Error al subir la imagen: " + errorText
                        );
                    }
                } catch (imgErr) {
                    console.error("Fallo al subir imagen:", imgErr);
                    alert("Imagen no pudo subirse: " + imgErr.message);
                }
            }
            

            alert("Perfil actualizado correctamente");
            navigate("/usuario");
        } catch (err) {
            console.error("Error al actualizar perfil:", err);
            alert("Error al actualizar el perfil: " + err.message);
        }
    }

    if (!user) return <div className="p-6">Cargando usuario...</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Editar Perfil
                </h2>

                <fieldset className="mb-6 border-t pt-4">
                    <legend className="text-lg font-semibold text-gray-700 mb-2">
                        Información personal
                    </legend>

                    <input
                        type="text"
                        placeholder="Nombre"
                        value={data.nombre}
                        onChange={(e) =>
                            setData({ ...data, nombre: e.target.value })
                        }
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />

                    <input
                        type="text"
                        placeholder="Apellido"
                        value={data.apellido}
                        onChange={(e) =>
                            setData({ ...data, apellido: e.target.value })
                        }
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />

                    <input
                        type="email"
                        value={data.email}
                        disabled
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    />

                    <div className="relative mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Nueva contraseña (opcional)"
                            value={data.password}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    <input
                        type="tel"
                        placeholder="Teléfono"
                        value={data.telefono}
                        onChange={(e) =>
                            setData({ ...data, telefono: e.target.value })
                        }
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />

                    <label className="block mb-1">Fecha de nacimiento:</label>
                    <input
                        type="date"
                        value={data.fechaNacimiento}
                        onChange={(e) =>
                            setData({
                                ...data,
                                fechaNacimiento: e.target.value,
                            })
                        }
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                </fieldset>

                <fieldset className="mb-6 border-t pt-4">
                    <legend className="text-lg font-semibold text-gray-700 mb-2">
                        Foto de perfil
                    </legend>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setData({
                                ...data,
                                imagenFile: e.target.files[0],
                            })
                        }
                        className="w-full border p-2 rounded bg-white"
                    />
                </fieldset>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                    Guardar cambios
                </button>

                <BtnVolver />
            </form>
        </div>
    );
}
