/*
 * @Description: 
 * @Date: 2025-05-18 19:23:11
 * @LastEditTime: 2025-05-18 19:33:53
 * @FilePath: \flight_info_management\src\db\init.ts
 */


import Database from 'better-sqlite3';

const db = new Database('./flight_info_management.db');

db.exec(`
CREATE TABLE IF NOT EXISTS UserInfo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS FlightInfo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flight_number TEXT NOT NULL UNIQUE,
    departure TEXT NOT NULL,
    arrival TEXT NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS PassengerInfo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    passport_number TEXT NOT NULL UNIQUE,
    seatNumber TEXT,
    flightId INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

export default db;