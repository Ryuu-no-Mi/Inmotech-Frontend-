import React from "react";
import BtnVolver from "../components/BtnInicio";

const ComingSoonPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center max-w-lg mx-auto transform transition-all duration-500 hover:scale-105">
                {/* Icono de engranaje animado o logo */}
                <div className="mb-6 flex justify-center">
                    <svg
                        className="w-24 h-24 text-indigo-600 animate-spin-slow  "
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                    </svg>
                </div>

                <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                    ¡Estamos Construyendo Algo{" "}
                    <span className="text-indigo-600 animate-fadeInScale">
                        Increíble
                    </span>
                    !
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                    Nuestra web está recibiendo una gran actualización.
                </p>

                {/* Botones de Contacto o Redes Sociales */}
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <a
                        href="mailto:jmonvil12@gmail.com"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        <span className="mr-2">&#9993;</span> Contáctanos
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jaime-andr%C3%A9s-monserrate-villa-67a51b189/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Sígueme en Linkedin
                    </a>
                </div>
            <BtnVolver />
            </div>
        </div>
    );
};

export default ComingSoonPage;
