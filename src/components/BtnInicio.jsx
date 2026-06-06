import { Link } from "react-router-dom";

export default function BtnInicio() {
    return (
        <div className=" flex items-center mt-4 text-center">
            <Link
            to="/"
                className="w-full flex justify-center px-6 py-3 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                <span to="/" className="text-md font-bold">
                    Volver al inicio
                </span>
            </Link>
        </div>
    );
}