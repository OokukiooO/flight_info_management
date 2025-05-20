import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/init';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const departure = searchParams.get('departure');
  const arrival = searchParams.get('arrival');
  const flightNumber = searchParams.get('flightNumber');

  let sql = 'SELECT * FROM FlightInfo WHERE 1=1';
  const params: string[] = [];

  if (departure) {
    sql += ' AND departure LIKE ?';
    params.push(`%${departure}%`);
  }
  if (arrival) {
    sql += ' AND arrival LIKE ?';
    params.push(`%${arrival}%`);
  }
  if (flightNumber) {
    sql += ' AND flightNumber LIKE ?';
    params.push(`%${flightNumber}%`);
  }

  const flights = db.prepare(sql).all(...params);
  return NextResponse.json({ flights });
}