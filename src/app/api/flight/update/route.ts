import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/init';

export async function POST(req: NextRequest) {
  const { id, flightNumber, departure, arrival, date } = await req.json();
  if (!id) return NextResponse.json({ error: '缺少航班ID' }, { status: 400 });
  db.prepare(
    `UPDATE FlightInfo SET flightNumber=?, departure=?, arrival=?, date=? WHERE id=?`
  ).run(flightNumber, departure, arrival, date, id);
  // 可根据你的表结构补充其它字段
  return NextResponse.json({ message: '修改成功' });
}