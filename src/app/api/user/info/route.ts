/*
 * @Description: 
 * @Date: 2025-05-18 18:56:21
 * @LastEditTime: 2025-05-18 19:33:13
 * @FilePath: \flight_info_management\src\app\api\user\info\route.ts
 */

import { NextRequest, NextResponse } from 'next/server';
// import Database from 'better-sqlite3';
import db from '@/db/init';
// const db = new Database('./flight_info_management.db');

interface UserInfo {
  id: number;
  username: string;
  email?: string;
  password?: string;
  [key: string]: unknown;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  if (!username) {
    return NextResponse.json({ error: '缺少用户名参数' }, { status: 400 });
  }
  const user = db.prepare('SELECT * FROM UserInfo WHERE username = ?').get(username) as UserInfo;
  if (!user) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }
  // 不返回密码
  const { password: _, ...userInfo } = user;
  return NextResponse.json({ user: userInfo });
}