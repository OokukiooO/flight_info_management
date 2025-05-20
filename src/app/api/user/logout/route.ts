import { NextResponse } from 'next/server';

export async function POST() {
  // 实际项目应清除 session/cookie
  return NextResponse.json({ message: '已登出' });
}