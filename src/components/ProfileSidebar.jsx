import { Link, useLocation } from "react-router-dom";
import { 
    Heart, 
    Home as HomeIcon, 
    Settings, 
    Mail,
    Building2,
    Users,
    LogOut
} from "lucide-react";

export default function Sidebar({ type = "user" }) {
    const location = useLocation();

    const userMenuItems = [
        { path: "/my-profile", label: "Perfil", icon: HomeIcon },
        { path: "/my-profile/favorites", label: "Favoritos", icon: Heart },
        { path: "/my-profile/settings", label: "Configuración", icon: Settings },
    ];

    const agencyMenuItems = [
        { path: "/my-agency", label: "Panel", icon: Building2 },
        { path: "/my-agency/properties", label: "Propiedades", icon: HomeIcon },
        { path: "/my-agency/agents", label: "Agentes", icon: Users, disabled: true },
        { path: "/my-agency/messages", label: "Mensajes", icon: Mail, disabled: true, badge: "Próximamente" },
        { path: "/my-agency/settings", label: "Configuración", icon: Settings },
    ];

    const menuItems = type === "agency" ? agencyMenuItems : userMenuItems;

    const isActive = (path) => {
        if (path === "/my-profile" || path === "/my-agency") {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <aside className="hidden lg:flex flex-col w-72 shrink-0 p-4 bg-surface rounded-xl border border-outline-variant h-fit sticky top-24">
            <div className="mb-6 px-2">
                <h2 className="text-headline-md text-primary font-bold">
                    {type === "agency" ? "Mi Agencia" : "Mi Cuenta"}
                </h2>
            </div>

            <nav className="flex flex-col gap-1">
                {menuItems.map((item) => (
                    item.disabled ? (
                        <div
                            key={item.path}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant opacity-60 cursor-not-allowed"
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-label-md flex-1">{item.label}</span>
                            {item.badge && (
                                <span className="text-[10px] bg-surface-container px-2 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </div>
                    ) : (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                isActive(item.path)
                                    ? "bg-secondary-container text-on-secondary-container"
                                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-label-md">{item.label}</span>
                        </Link>
                    )
                ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-outline-variant">
                <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-label-md">Volver al inicio</span>
                </Link>
            </div>
        </aside>
    );
}