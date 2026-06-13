import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/logo_new_inmotech.svg";


export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-surface border-b border-outline-variant sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt="Logo Inmotech"
                            className="h-10 w-10"
                        />
                        <Link to="/" className="text-headline-md text-primary font-bold">
                            InmoTech
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        {user?.email ? (
                            <>
                                <Link to="/create-property" className="text-label-md text-on-surface-variant hover:text-primary transition-colors">
                                    Crear Propiedad
                                </Link>
                                {user.idAgencia ? (
                                    <Link to="/detail-agency" className="text-label-md text-on-surface-variant hover:text-primary transition-colors">
                                        Mi Agencia
                                    </Link>
                                ) : (
                                    <Link to="/create-agency" className="text-label-md text-on-surface-variant hover:text-primary transition-colors">
                                        Crear Agencia
                                    </Link>
                                )}
                                <Link to="/usuario" className="text-label-md text-on-surface-variant hover:text-primary transition-colors">
                                    {user.nombre}
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-label-md text-on-surface-variant hover:text-error transition-colors"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-label-md text-on-surface-variant hover:text-primary transition-colors">
                                    Iniciar Sesión
                                </Link>
                                <Link to="/register" className="text-label-md bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 text-on-surface-variant hover:text-primary"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-surface border-t border-outline-variant px-4 py-4 space-y-3">
                    {user?.email ? (
                        <>
                            <Link to="/create-property" className="block text-label-md text-on-surface-variant hover:text-primary">
                                Crear Propiedad
                            </Link>
                            {user.idAgencia ? (
                                <Link to="/detail-agency" className="block text-label-md text-on-surface-variant hover:text-primary">
                                    Mi Agencia
                                </Link>
                            ) : (
                                <Link to="/create-agency" className="block text-label-md text-on-surface-variant hover:text-primary">
                                    Crear Agencia
                                </Link>
                            )}
                            <Link to="/usuario" className="block text-label-md text-on-surface-variant hover:text-primary">
                                {user.nombre}
                            </Link>
                            <button onClick={logout} className="block text-label-md text-error">
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block text-label-md text-on-surface-variant hover:text-primary">
                                Iniciar Sesión
                            </Link>
                            <Link to="/register" className="block text-label-md bg-primary text-white px-4 py-2 rounded-lg text-center">
                                Registrarse
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}