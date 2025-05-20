import { NextRequest, NextResponse } from 'next/server';
// import Database from 'better-sqlite3';
import db from '@/db/init';
// const db = new Database('./flight_info_management.db');

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 });
  }
  try {
    const exists = db.prepare('SELECT * FROM UserInfo WHERE username = ?').get(username);
    if (exists) {
      return NextResponse.json({ error: '用户名已存在' }, { status: 409 });
    }
    db.prepare('INSERT INTO UserInfo (username, password) VALUES (?, ?)').run(username, password);
    return NextResponse.json({ message: '注册成功' });
  } catch (e: unknown) {
    // 输出详细错误信息
    const errorMessage = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: '注册失败', detail: errorMessage }, { status: 500 });
  }
}