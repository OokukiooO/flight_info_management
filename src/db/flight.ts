import Database from 'better-sqlite3';

const db = new Database('./flight_info_management.db');

export interface Flight {
  flightNumber: string;
  departure: string;
  arrival: string;
  date: string;
}

export const addFlight = (flight: Flight) => {
  const stmt = db.prepare('INSERT INTO FlightInfo (flightNumber, departure, arrival, date) VALUES (?, ?, ?, ?)');
  const info = stmt.run(flight.flightNumber, flight.departure, flight.arrival, flight.date);
  return info.lastInsertRowid;
};

export interface FlightRecord extends Flight {
  id: number;
}

export const getFlight = (id: number): FlightRecord | undefined => {
  const stmt = db.prepare('SELECT * FROM FlightInfo WHERE id = ?');
  return stmt.get(id) as FlightRecord | undefined;
};

export interface UpdateFlightParams {
  flightNumber: string;
  departure: string;
  arrival: string;
  date: string;
}

export const updateFlight = (id: number, flight: UpdateFlightParams): void => {
  const stmt = db.prepare('UPDATE FlightInfo SET flightNumber = ?, departure = ?, arrival = ?, date = ? WHERE id = ?');
  stmt.run(flight.flightNumber, flight.departure, flight.arrival, flight.date, id);
};

export interface DeleteFlightParams {
  id: number;
}

export const deleteFlight = (id: DeleteFlightParams['id']): void => {
  const stmt = db.prepare('DELETE FROM FlightInfo WHERE id = ?');
  stmt.run(id);
};