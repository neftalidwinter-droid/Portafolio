import React, { useState } from 'react';
import { TARIFF_TYPES } from '../data/flightsData';

export default function FlightCard({ flight, passengers, onSelectFlight }) {
    const [selectedTariffKey, setSelectedTariffKey] = useState('ZERO');

    const tariff = TARIFF_TYPES[selectedTariffKey];
    const unitPrice = Math.round(flight.basePrice * tariff.multiplier);
    const totalPrice = unitPrice * passengers;

    return (
        <div className="flight-card">
            <div className="flight-card-left">
                <div className="flight-meta-header">
                    <span className="airline-tag">{flight.airline}</span>
                    <span className="flight-number">{flight.flightNumber}</span>
                    <span className="flight-badge-direct">✓ {flight.stops}</span>
                </div>

                <div className="flight-itinerary">
                    <div className="itinerary-node">
                        <span className="time">{flight.departureTime}</span>
                        <span className="airport-code">{flight.origin}</span>
                        <span className="airport-city">Monterrey</span>
                    </div>
                    
                    <div className="itinerary-duration-line">
                        <span className="duration-label">{flight.duration}</span>
                        <div className="travel-line">
                            <div className="line-dot"></div>
                            <div className="line-bar"></div>
                            <div className="line-dot"></div>
                        </div>
                        <span className="plane-indicator">✈</span>
                    </div>

                    <div className="itinerary-node text-right">
                        <span className="time">{flight.arrivalTime}</span>
                        <span className="airport-code">{flight.destination}</span>
                        <span className="airport-city">Destino</span>
                    </div>
                </div>

                {flight.seatsAvailable <= 5 && (
                    <div className="urgency-pill">
                        ⚡ ¡Solo quedan {flight.seatsAvailable} asientos a este precio!
                    </div>
                )}
            </div>

            <div className="flight-card-right">
                <div className="tariff-pills">
                    {Object.entries(TARIFF_TYPES).map(([key, t]) => (
                        <button
                            key={key}
                            type="button"
                            className={`tariff-pill-btn ${selectedTariffKey === key ? 'active' : ''}`}
                            onClick={ () => setSelectedTariffKey(key) }
                        >
                            <span className="tariff-pill-title">{t.name}</span>
                            <span className="tariff-pill-multiplier">+{ Math.round((t.multiplier - 1) * 100) }%</span>
                        </button>
                    ))}
                </div>

                <div className="tariff-description-box">
                    <small>{tariff.baggage}</small>
                </div>

                <div className="price-section">
                    <span className="price-label">Total ({passengers} {passengers === 1 ? 'adulto' : 'adultos'}):</span>
                    <div className="price-display">
                        <span className="currency">MXN</span>
                        <span className="amount">${totalPrice.toLocaleString('es-MX')}</span>
                    </div>
                    <span className="tua-text">Incluye TUA e impuestos calculados</span>
                </div>

                <button
                    className="btn-select-flight"
                    onClick={() => onSelectFlight({ flight, tariff: tariff.name, unitPrice, totalPrice, passengers })}
                >
                    Seleccionar Vuelo
                </button>
            </div>
        </div>
    );
}
