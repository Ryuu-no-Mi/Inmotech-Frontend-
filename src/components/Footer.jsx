export default function Footer() {
    return (
        <footer className="bg-surface-container-high py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-headline-md text-primary font-bold mb-2">InmoTech</h3>
                        <p className="text-body-md text-on-surface-variant">
                            Tu próximo hogar te espera
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-label-md">
                        <a href="#privacy" className="text-on-surface-variant hover:text-primary transition-colors">
                            Política de Privacidad
                        </a>
                        <a href="#terms" className="text-on-surface-variant hover:text-primary transition-colors">
                            Términos de Servicio
                        </a>
                        <a href="#contact" className="text-on-surface-variant hover:text-primary transition-colors">
                            Contacto
                        </a>
                    </div>
                </div>
                <div className="border-t border-outline-variant mt-6 pt-6 text-center space-y-2">
                    <p className="text-label-md text-on-surface-variant">
                        © 2025 InmoTech. Todos los derechos reservados.
                    </p>
                    <p className="text-label-md text-on-surface-variant">
                        Creado con cariño por{" "}
                        <a
                            href="https://github.com/Ryuu-no-Mi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-tertiary hover:text-tertiary/80 transition-colors font-semibold"
                        >
                            Ryuu-no-Mi
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}