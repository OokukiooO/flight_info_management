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
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS FlightInfo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flightNumber TEXT NOT NULL,
    departure TEXT NOT NULL,
    arrival TEXT NOT NULL,
    date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS PassengerInfo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    flightId INTEGER,
    FOREIGN KEY (flightId) REFERENCES FlightInfo(id)
);
`);

export default db;