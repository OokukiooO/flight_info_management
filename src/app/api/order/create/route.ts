/*
 * @Description: 
 * @Date: 2025-05-18 19:34:24
 * @LastEditTime: 2025-05-18 19:35:31
 * @FilePath: \flight_info_management\src\app\api\order\create\route.ts
 */

import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/init';

export async function POST(req: NextRequest) {
  const { name, passportNumber, seatNumber, flightId } = await req.json();
  if (!name || !passportNumber || !seatNumber || !flightId) {
    return NextResponse.json({ error: '信息不完整' }, { status: 400 });
  }
  try {
    // 检查余票
    type Flight = { id: number; remainingTickets?: number; [key: string]: unknown };
    const flight = db.prepare('SELECT * FROM FlightInfo WHERE id = ?').get(flightId) as Flight;
    if (!flight) return NextResponse.json({ error: '航班不存在' }, { status: 404 });
    if (flight.remainingTickets !== undefined && flight.remainingTickets <= 0) {
      return NextResponse.json({ error: '余票不足' }, { status: 400 });
    }
    // 插入乘客信息
    db.prepare('INSERT INTO PassengerInfo (name, passport_number, seatNumber, flightId) VALUES (?, ?, ?, ?)')
      .run(name, passportNumber, seatNumber, flightId);
    // 更新余票
    if (flight.remainingTickets !== undefined) {
      db.prepare('UPDATE FlightInfo SET remainingTickets = remainingTickets - 1 WHERE id = ?').run(flightId);
    }
    return NextResponse.json({ message: '预定成功' });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: '预定失败', detail: errorMessage }, { status: 500 });
  }
}