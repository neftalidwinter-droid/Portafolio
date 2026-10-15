import React, { useState } from 'react';
import { AIRPORTS } from '../data/flightsData';

export default function FlightSearch({ onSearch }) {
    const [destination, setDestination] = useState('PBC');
    const [departureDate, setDepartureDate] = useState('2026-10-15');
    const [passengers, setPassengers] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ destination, departureDate, passengers: Number(passengers) });
    }

    return (
        <div className="search-widget-card">
            <div className="search-title">
                <h3>Buscar vuelos desde Monterrey (MTY)</h3>
                <p>Precios directos de tarifa base, sin comisiones ocultas</p>
            </div>

            <form onSubmit={handleSubmit} className="search-form-grid">
                <div className="form-field">
                    <label>Origen (Hub)</label>
                    <div className="input-fixed">
                        📍 Monterrey (MTY)
                    </div>
                </div>

                <div className="form-field">
                    <label>Destino</label>
                    <select
                        value={destination}
                        onChange={ (e) => setDestination(e.target.value) }
                        className="form-select"
                    >
                        {AIRPORTS.filter(a => a.code !== 'MTY').map(airport => (
                            <option key={airport.code} value={airport.code}>
                                {airport.city} ({airport.code})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
                    <label>Fecha de Salida</label>
                    <input
                        type="date"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Pasajeros</label>
                    <select
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className="form-select"
                    >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>
                                {num} {num === 1 ? 'Pasajero' : 'Pasajeros'}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field form-submit-container">
                    <button type="submit" className="btn-search-flights">
                        🔍 Buscar Vuelos
                    </button>
                </div>
            </form>
        </div>
    );
}
