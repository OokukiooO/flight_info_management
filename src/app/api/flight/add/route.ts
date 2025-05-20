/*
 * @Description: 
 * @Date: 2025-05-18 19:36:02
 * @LastEditTime: 2025-05-18 19:36:17
 * @FilePath: \flight_info_management\src\app\api\flight\add\route.ts
 */

import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/init';

export async function POST(req: NextRequest) {
  const { flightNumber, departure, arrival, date } = await req.json();
  if (!flightNumber || !departure || !arrival || !date) {
    return NextResponse.json({ error: '信息不完整' }, { status: 400 });
  }
  db.prepare(
    `INSERT INTO FlightInfo (flightNumber, departure, arrival, date) VALUES (?, ?, ?, ?)`
  ).run(flightNumber, departure, arrival, date);
  // 可根据你的表结构补充其它字段
  return NextResponse.json({ message: '添加成功' });
}