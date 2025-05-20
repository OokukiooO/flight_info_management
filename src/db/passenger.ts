/*
 * @Description: 
 * @Date: 2025-05-18 18:23:56
 * @LastEditTime: 2025-05-18 18:47:05
 * @FilePath: \flight_info_management\src\db\passenger.ts
 */

import Database from 'better-sqlite3';

const db = new Database('./flight_info_management.db');

export interface Passenger {
  name: string;
  age: number;
  flightId: number;
}

export interface PassengerRecord extends Passenger {
  id: number;
}

export function addPassenger(passenger: Passenger): void {
  const { name, age, flightId } = passenger;
  const stmt = db.prepare('INSERT INTO PassengerInfo (name, age, flightId) VALUES (?, ?, ?)');
  stmt.run(name, age, flightId);
}

export function getPassengerById(id: number): PassengerRecord | undefined {
  const stmt = db.prepare('SELECT * FROM PassengerInfo WHERE id = ?');
  return stmt.get(id) as PassengerRecord | undefined;
}

export function getAllPassengers() {
  const stmt = db.prepare('SELECT * FROM PassengerInfo');
  return stmt.all();
}

export interface UpdatePassengerParams {
  name: string;
  age: number;
  flightId: number;
}

export function updatePassenger(id: number, passenger: UpdatePassengerParams): void {
  const { name, age, flightId } = passenger;
  const stmt = db.prepare('UPDATE PassengerInfo SET name = ?, age = ?, flightId = ? WHERE id = ?');
  stmt.run(name, age, flightId, id);
}

export interface DeletePassengerParams {
  id: number;
}

export function deletePassenger(id: DeletePassengerParams['id']): void {
  const stmt = db.prepare('DELETE FROM PassengerInfo WHERE id = ?');
  stmt.run(id);
}

/*
CREATE TABLE PassengerInfo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flight_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    passport_number TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (flight_id) REFERENCES FlightInfo(id),
    FOREIGN KEY (user_id) REFERENCES UserInfo(id)
);
*/