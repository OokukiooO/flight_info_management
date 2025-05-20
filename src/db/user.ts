/*
 * @Description: 
 * @Date: 2025-05-18 18:24:05
 * @LastEditTime: 2025-05-18 18:40:45
 * @FilePath: \flight_info_management\src\db\user.ts
 */

import Database from 'better-sqlite3';

const db = new Database('./flight_info_management.db');

export interface User {
  username: string;
  password: string;
  email: string;
}

export interface UserRecord extends User {
  id: number;
  created_at: string;
}

// 创建用户
export const createUser = (username: string, password: string, email: string) => {
  const stmt = db.prepare('INSERT INTO UserInfo (username, password, email) VALUES (?, ?, ?)');
  const info = stmt.run(username, password, email);
  return info.lastInsertRowid;
};

// 根据ID获取用户
export const getUserById = (id: number): UserRecord | undefined => {
  const stmt = db.prepare('SELECT * FROM UserInfo WHERE id = ?');
  return stmt.get(id) as UserRecord | undefined;
};

// 根据用户名获取用户
export const getUserByUsername = (username: string): UserRecord | undefined => {
  const stmt = db.prepare('SELECT * FROM UserInfo WHERE username = ?');
  return stmt.get(username) as UserRecord | undefined;
};

// 更新用户
export const updateUser = (id: number, user: Partial<User>) => {
  const fields = [];
  const values = [];
  if (user.username) { fields.push('username = ?'); values.push(user.username); }
  if (user.password) { fields.push('password = ?'); values.push(user.password); }
  if (user.email) { fields.push('email = ?'); values.push(user.email); }
  if (fields.length === 0) return;
  values.push(id);
  const stmt = db.prepare(`UPDATE UserInfo SET ${fields.join(', ')} WHERE id = ?`);
  stmt.run(...values);
};

// 删除用户
export const deleteUser = (id: number) => {
  const stmt = db.prepare('DELETE FROM UserInfo WHERE id = ?');
  stmt.run(id);
};