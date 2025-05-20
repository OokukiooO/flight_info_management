// filepath: c:\Users\DELL\flight_info_management\src\types\index.ts
export interface FlightInfo {
    id: number;
    flightNumber: string;
    departure: string;
    arrival: string;
    departureTime: Date;
    arrivalTime: Date;
    airline: string;
}

export interface PassengerInfo {
    id: number;
    name: string;
    email: string;
    phone: string;
    flightId: number; // Foreign key to FlightInfo
}

export interface UserInfo {
    id: number;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}