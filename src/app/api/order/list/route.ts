import { NextResponse } from 'next/server';
import db from '@/db/init';

export async function GET() {
  const orders = db.prepare('SELECT * FROM PassengerInfo').all();
  return NextResponse.json({ orders });
}