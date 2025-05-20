import Database from 'better-sqlite3';

const db = new Database('./flight_info_management.db');

export interface Flight {
  flight_number: string;
  departure: string;
  arrival: string;
  departure_time: string;
  arrival_time: string;
}

export interface FlightRecord extends Flight {
  id: number;
  created_at: string;
}

export const addFlight = (flight: Flight) => {
  const stmt = db.prepare(
    'INSERT INTO FlightInfo (flight_number, departure, arrival, departure_time, arrival_time) VALUES (?, ?, ?, ?, ?)'
  );
  const info = stmt.run(
    flight.flight_number,
    flight.departure,
    flight.arrival,
    flight.departure_time,
    flight.arrival_time
  );
  return info.lastInsertRowid;
};

export const getFlight = (id: number): FlightRecord | undefined => {
  const stmt = db.prepare('SELECT * FROM FlightInfo WHERE id = ?');
  return stmt.get(id) as FlightRecord | undefined;
};

export const getAllFlights = (): FlightRecord[] => {
  const stmt = db.prepare('SELECT * FROM FlightInfo');
  return stmt.all() as FlightRecord[];
};

export interface UpdateFlightParams {
  flight_number: string;
  departure: string;
  arrival: string;
  departure_time: string;
  arrival_time: string;
}

export const updateFlight = (id: number, flight: UpdateFlightParams): void => {
  const stmt = db.prepare(
    'UPDATE FlightInfo SET flight_number = ?, departure = ?, arrival = ?, departure_time = ?, arrival_time = ? WHERE id = ?'
  );
  stmt.run(
    flight.flight_number,
    flight.departure,
    flight.arrival,
    flight.departure_time,
    flight.arrival_time,
    id
  );
};

export const deleteFlight = (id: number): void => {
  const stmt = db.prepare('DELETE FROM FlightInfo WHERE id = ?');
  stmt.run(id);
};