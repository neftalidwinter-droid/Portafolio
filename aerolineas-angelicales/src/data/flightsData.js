export const AIRPORTS = [
    {code: 'MTY', name: 'Monterrey — Aeropuerto Internacional Mariano Escobedo', city: 'Monterrey'},
    {code: 'PBC', name: 'Puebla — Aeropuerto Internacional Hermanos Serdán', city: 'Huejotzingo'},
    {code: 'VER', name: 'Veracruz — Aeropuerto Internacional General Heriberto Jara', city: 'Veracruz'},
    {code: 'GDL', name: 'Guadalajara — Aeropuerto Internacional Miguel Hidalgo y Costilla', city: 'Guadalajara'},
    {code: 'TGZ', name: 'Chiapas — Aeropuerto Internacional Ángel Albino Corzo', city: 'Tuxtla Gutierrez'},
    {code: 'MEX', name: 'Ciudad de México — Aeropuerto Internacional Benito Juárez', city: 'Ciudad de México'},
    {code: 'NLU', name: 'Santa Lucía — Aeropuerto Internacional Felipe Ángeles', city: 'Santa Lucía'},
]

export const FLIGHTS_CATALOG = [
    {
        id:'VB001',
        flightNumber:'VB001',
        origin:'MTY',
        destination:'MEX',
        departureTime:'06:15',
        arrivalTime:'08:05',
        duration: '1h 50m',
        basePrice: 1250,
        seatsAvailable: 8,
        stops: 'Directo',
        airline: 'Aerolíneas Angelicales'
    },
    {
        id:'VB002',
        flightNumber:'VB002',
        origin:'MTY',
        destination:'VER',
        departureTime:'08:10',
        arrivalTime:'09:50',
        duration: '1h 40m',
        basePrice: 1380,
        seatsAvailable: 12,
        stops: 'Directo',
        airline: 'Aerolíneas Angelicales'
    },
    {
        id:'VB003',
        flightNumber:'VB003',
        origin:'MTY',
        destination:'GDL',
        departureTime:'09:20',
        arrivalTime:'10:55',
        duration: '1h 35m',
        basePrice: 1120,
        seatsAvailable: 6,
        stops: 'Directo',
        airline: 'Aerolíneas Angelicales'
    },
    {
        id:'VB004',
        flightNumber:'VB004',
        origin:'MTY',
        destination:'PBC',
        departureTime:'11:00',
        arrivalTime:'12:45',
        duration: '1h 45m',
        basePrice: 1260,
        seatsAvailable: 10,
        stops: 'Directo',
        airline: 'Aerolíneas Angelicales'
    },
    {
        id:'VB005',
        flightNumber:'VB005',
        origin:'MTY',
        destination:'NLU',
        departureTime:'12:40',
        arrivalTime:'14:30',
        duration: '1h 50m',
        basePrice: 890,
        seatsAvailable: 9,
        stops: 'Directo',
        airline: 'Aerolíneas Angelicales'
    },
    {
        id:'VB006',
        flightNumber:'VB006',
        origin:'MTY',
        destination:'TGZ',
        departureTime:'14:15',
        arrivalTime:'16:50',
        duration: '2h 35m',
        basePrice: 1050,
        seatsAvailable: 7,
        stops: 'Directo',
        airline: 'Aerolíneas Angelicales'
    }
]

export const TARIFF_TYPES = {
    ZERO: { name: 'Zero', multiplier: 1.0, baggage: 'Solo objeto personal (mochila)' },
    LIGHT: { name: 'Light', multiplier: 1.25, baggage: 'Objeto personal + Maleta de mano 10kg' },
    EXTRA: { name: 'Smart', multiplier: 1.60, baggage: 'Mano 10kg + Equipaje documentado 25kg + Asiento VIP' }
}
