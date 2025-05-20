/*
 * @Description: 
 * @Date: 2025-05-18 18:24:05
 * @LastEditTime: 2025-05-18 18:40:45
 * @FilePath: \flight_info_management\src\db\user.ts
 */

import Database from 'better-sqlite3';

const db = new Database('./flight_info_management.db');

// 创建用户
export const createUser = (username: string, password: string) => {
  const stmt = db.prepare('INSERT INTO UserInfo (username, password) VALUES (?, ?)');
  const info = stmt.run(username, password);
  return info.lastInsertRowid;
};

// 根据ID获取用户
export const getUserById = (id: number) => {
  const stmt = db.prepare('SELECT * FROM UserInfo WHERE id = ?');
  return stmt.get(id);
};

// 根据用户名获取用户
export const getUserByUsername = (username: string) => {
  const stmt = db.prepare('SELECT * FROM UserInfo WHERE username = ?');
  return stmt.get(username);
};

// 更新用户
export const updateUser = (id: number, username: string, password: string) => {
  const stmt = db.prepare('UPDATE UserInfo SET username = ?, password = ? WHERE id = ?');
  stmt.run(username, password, id);
};

// 删除用户
export const deleteUser = (id: number) => {
  const stmt = db.prepare('DELETE FROM UserInfo WHERE id = ?');
  stmt.run(id);
};