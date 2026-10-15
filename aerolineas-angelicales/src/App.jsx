import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FlightSearch from './components/FlightSearch';
import FlightCard from './components/FlightCard';
import BookingModal from './components/BookingModal';
import { FLIGHTS_CATALOG } from './data/flightsData';
import './App.css';

export default function App() {
  const [filteredFlights, setFilteredFlights] = useState(
    FLIGHTS_CATALOG.filter(f => f.destination === 'PBC')
  );
  const [passengers, setPassengers] = useState(1);
  const [searchParams, setSearchParams] = useState({ destination: 'PBC', departureDate: '2026-10-15' });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleSearch = ({ destination, departureDate, passengers: paxCount }) => {
    setPassengers(paxCount);
    setSearchParams({ destination, departureDate });
    const results = FLIGHTS_CATALOG.filter(f => f.destination === destination);
    setFilteredFlights(results);
    setBookingConfirmed(false);
  };

  const handleSelectFlight = (bookingInfo) => {
    setSelectedBooking(bookingInfo);
  };

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    setSelectedBooking(null);
  };

  return (
    <div className="app-wrapper">
      <Navbar />

      <header className="hero-section">
        <div className="hero-content">
          <h1>Vuela desde Monterrey a Todo México</h1>
          <p>Encuentra las mejores tarifas ultra-low-cost de Aerolíneas Angelicales</p>
        </div>
      </header>

      <main className="main-container">
        <FlightSearch onSearch={handleSearch} />

        {bookingConfirmed && (
          <div className="banner-success">
            🎉 ¡Tu vuelo ha sido reservado exitosamente en memoria! Revisa el mostrador en Terminal C de MTY.
          </div>
        )}

        <section className="results-section">
          <div className="results-header">
            <h2>
              Vuelos directos encontrados ({filteredFlights.length})
            </h2>
            <span className="route-badge">
              MTY ➔ {searchParams.destination} • {searchParams.departureDate}
            </span>
          </div>
          
          {filteredFlights.length === 0 ? (
            <div className="no-results-card">
              <p>No se encontraron vuelos directos disponibles para la ruta seleccionada.</p>
            </div>
          ) : (
            <div className="flight-list">
              {filteredFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  passengers={passengers}
                  onSelectFlight={handleSelectFlight}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <BookingModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onConfirm={handleConfirmBooking}
      />

      <footer className="app-footer">
        <p>© 2026 Aerolíneas Angelicales S.A. de C.V. — Práctica de Laboratorio Universitaria React + Vite.</p>
      </footer>
    </div>
  );
}
