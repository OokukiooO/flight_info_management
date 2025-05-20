import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/init';

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: '缺少航班ID' }, { status: 400 });
  db.prepare('DELETE FROM FlightInfo WHERE id = ?').run(id);
  return NextResponse.json({ message: '删除成功' });
}