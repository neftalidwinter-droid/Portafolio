import React from "react";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="brand-logo">
                    <span className="plane-icon">✈️</span>
                    <div>
                        <span className="brand-name">Aerolíneas Angelicales</span>
                        <span className="brand-sub">Vuela Alto, Paga Menos</span>
                    </div>
                </div>
                <div className="nav-links">
                    <span className="nav-item active">Vuelos</span>
                    <span className="nav-item">Mis Reservas</span>
                    <span className="nav-item">Check-in</span>
                    <button className="btn-promo">Promo Monterrey</button>
                </div>
            </div>
        </nav>
    );
}
