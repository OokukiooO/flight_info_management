/*
 * @Description: 
 * @Date: 2025-05-18 18:54:11
 * @LastEditTime: 2025-05-18 18:54:41
 * @FilePath: \flight_info_management\src\app\api\user\login\route.ts
 */

import { NextRequest, NextResponse } from 'next/server';
// import Database from 'better-sqlite3';
import db from '@/db/init';
// const db = new Database('./flight_info_management.db');

type UserInfo = {
  username: string;
  password: string;
  // add other fields if needed
};

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const user = db.prepare('SELECT * FROM UserInfo WHERE username = ? AND password = ?').get(username, password) as UserInfo | undefined;
  if (!user) {
    return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
  }
  // 简单返回用户信息，实际项目应返回 token 或设置 cookie
  return NextResponse.json({ message: '登录成功', user: { username: user.username } });
}