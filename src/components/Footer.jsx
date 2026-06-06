export default function Footer() {
    return (
        <footer className="footer flex flex-row items-center justify-center bg-gray-800 text-white p-4">
            <div className="footer__content flex flex-col items-center">
                <p className="footer__text">
                    © 2025 Inmotech. All rights reserved.
                </p>
                <ul className="footer__links flex flex-row items-center justify-center space-x-4 mt-2">
                    <li className="footer__link-item">
                        <a href="#privacy">Privacy Policy</a>
                    </li>
                    <li className="footer__link-item">
                        <a href="#terms">Terms of Service</a>
                    </li>
                    <li className="footer__link-item">
                        <a href="#contact">Contact Us</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}