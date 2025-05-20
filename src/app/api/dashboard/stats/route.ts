import { NextResponse } from 'next/server';
import db from '@/db/init';

export async function GET() {
  const userCount = (db.prepare('SELECT COUNT(*) as count FROM UserInfo').get() as { count: number }).count;
  const flightCount = ( db.prepare('SELECT COUNT(*) as count FROM FlightInfo').get() as { count: number }).count;
  const orderCount = ( db.prepare('SELECT COUNT(*) as count FROM PassengerInfo').get() as { count: number }).count;
  return NextResponse.json({ userCount, flightCount, orderCount });
}