import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/logo_inmotech_2.png";
import AgencyDetail from "../pages/AgencyDetail";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-indigo-600 text-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo + nombre */}
                    <div className="flex items-center">
                        <img
                            src={logo}
                            alt="Logo Inmotech"
                            className="h-12 w-12 mr-2"
                        />
                        <Link to="/" className="text-2xl font-bold">
                            InmoTech
                        </Link>
                    </div>

                    {/* btn hamburguesa */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Menu en pantallas grandes */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user?.email ? (
                            <>
                                <Link to="/create-property" className="hover:text-gray-300">
                                    Crear Propiedad
                                </Link>
                                    {user.idAgencia ? 
                                        <Link
                                            to="/detail-agency"
                                            className="hover:text-gray-300"
                                        >
                                            Mi Agencia
                                        </Link>
                                        :
                                        <Link
                                            to="/create-agency"
                                            className="hover:text-gray-300"
                                        >
                                            Crear Agencia
                                        </Link>
                                    }
                                <Link
                                    to="/usuario"
                                    className="block hover:text-gray-300"
                                >
                                    {user.nombre}
                                </Link>

                                <button
                                    onClick={logout}
                                    className="hover:text-gray-300"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="hover:text-gray-300"
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    to="/register"
                                    className="hover:text-gray-300"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Menú desplegable en móvil */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 flex flex-col items-end">
                    <Link to="/" className="block hover:text-gray-300">
                        Inicio
                    </Link>
                    {user?.email ? (
                        <>
                            <Link to="/usuario" className="block">
                                {user.nombre}
                            </Link>

                            <button
                                onClick={logout}
                                className="block hover:text-gray-300"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="block hover:text-gray-300"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                to="/register"
                                className="block hover:text-gray-300"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
