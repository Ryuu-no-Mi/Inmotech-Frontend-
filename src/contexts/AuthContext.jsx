import React, { createContext, useState, useEffect } from "react";
import { api, publicApi } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState({
        id: null,
        nombre: null,
        apellido: null,
        email: null,
        telefono: null,
        fechaNacimiento: null,
        fechaRegistro: null,
        idAgencia: null,
        imagenUrl: null,
    });
    const [favorites, setFavorites] = useState([]);
    const [myProperties, setMyProperties] = useState([]);

    // Llama a las APIs para poblar favoritos y propiedades del usuario
    const loadUserData = async (userId) => {
        try {
            const favRes = await api.get(`/favourite/${userId}`);

            //setFavorites(favRes.data.map((f) => f.propiedadId));
            if (Array.isArray(favRes.data)) {
                const favoritos = favRes.data.map((f) => f.propiedadId);
                setFavorites(favoritos);
            } else {
                setFavorites([]);
            }
        } catch (e) {
            console.error("Error loading favorites", e);
            setFavorites([]);
        }

        try {
            const propRes = await api.get("/property/myProperties");
            //setMyProperties(propRes.data);

            if (Array.isArray(propRes.data)) {
                setMyProperties(propRes.data);
            } else {
                setMyProperties([]); 
            }
        } catch (e) {
            console.error("Error loading myProperties", e);
        }
    };

    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        const jwt = res.data.token;
        if (!jwt) throw new Error("Token no recibido");

        localStorage.setItem("token", jwt);
        setToken(jwt);

        const users = (await api.get("/user")).data;
        const me = users.find((u) => u.email === email);

        if (!me) throw new Error("Usuario no encontrado tras login");

        setUser({
            id: me.id,
            nombre: me.nombre,
            apellido: me.apellido,
            email: me.email,
            telefono: me.telefono,
            fechaNacimiento: me.fechaNacimiento,
            fechaRegistro: me.fechaRegistro,
            idAgencia: me.idAgencia,
            imagenUrl: me.imagenUrl,
        });

        await loadUserData(me.id);
    };


    // crea el usuario, guarda el token y email, y hace login automático
    const register = async (data) => {
        await publicApi.post("/user/register", data);
        console.log("Usuario registrado:", data.email);

        alert("Usuario registrado correctamente. Iniciando sesión...");

        await login(data.email, data.password); 

        // Subir imagen si viene
        if (data.imagenFile) {
            const formData = new FormData();
            formData.append("file", data.imagenFile);

            const me = (await api.get("/user/me")).data;

            const res = await fetch(
                `http://localhost:8080/api/imageUser/${me.id}`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            if (!res.ok) {
                const msg = await res.text();
                throw new Error("Error al subir imagen: " + msg);
            }
        }
    };

    const loginWithGoogle = async (jwt, email, userId) => {
        if (!jwt) throw new Error("Token no recibido de Google");

        localStorage.setItem("token", jwt);
        setToken(jwt);

        try {
            const res = await api.get("/user/me");
            const me = res.data;

            setUser({
                id: me.id,
                nombre: me.nombre,
                apellido: me.apellido,
                email: me.email,
                telefono: me.telefono,
                fechaNacimiento: me.fechaNacimiento,
                fechaRegistro: me.fechaRegistro,
                idAgencia: me.idAgencia,
                imagenUrl: me.imagenUrl,
            });

            await loadUserData(me.id);
        } catch (err) {
            console.error("Error cargando datos tras Google login", err);
            setUser({
                id: userId,
                nombre: null,
                apellido: null,
                email: email,
                telefono: null,
                fechaNacimiento: null,
                fechaRegistro: null,
                idAgencia: null,
                imagenUrl: null,
            });
        }
    };

    // Logout: borra token, email, favoritos y propiedades
    const logout = () => {
        alert("Cerrando sesión");
        console.log("Cerrando sesión");
        localStorage.removeItem("token");
        setToken(null);
        setUser({
            id: null,
            nombre: null,
            apellido: null,
            email: null,
            telefono: null,
            fechaNacimiento: null,
            fechaRegistro: null,
            idAgencia: null,
            imagenUrl: null,
        });
        setFavorites([]);
        setMyProperties([]);
    };

    useEffect(() => {
        const initializeUser = async () => {
            if (token && !user.id) {
                try {
                    // const users = (await api.get("/user")).data;
                    // const emailFromToken = getEmailFromToken(token);
                    // const me = users.find((u) => u.email === emailFromToken);
                    const res = await api.get("/user/me");
                    const me = res.data;

                    if (me) {
                        setUser({
                            id: me.id,
                            nombre: me.nombre,
                            apellido: me.apellido,
                            email: me.email,
                            telefono: me.telefono,
                            fechaNacimiento: me.fechaNacimiento,
                            fechaRegistro: me.fechaRegistro,
                            idAgencia: me.idAgencia,
                            imagenUrl: me.imagenUrl,
                        });
                        console.log("Usuario encontrado:", me.email);
                        // Cargar favoritos y propiedades del usuario
                        await loadUserData(me.id);
                    }
                } catch (err) {
                    console.error("Error reconstruyendo sesión", err);
                    logout(); // token no valido se cierra sesion
                }
            }
        };
        initializeUser();
    }, [token]);

    // Si hay token, obtenemos el usuario y sus datos
    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                setUser,
                favorites,
                myProperties,
                setMyProperties,
                login,
                register,
                logout,
                loginWithGoogle,
                reloadUserData: () => loadUserData(user.id),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
