'use client';
import { useState, useEffect } from 'react';
import { Table } from 'antd';

export default function OrderManage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/api/order/list').then(res => res.json()).then(res => setData(res.orders));
  }, []);

  const columns = [
    { title: '乘客姓名', dataIndex: 'name', key: 'name' },
    { title: '证件号', dataIndex: 'passport_number', key: 'passport_number' },
    { title: '座位号', dataIndex: 'seatNumber', key: 'seatNumber' },
    { title: '航班ID', dataIndex: 'flightId', key: 'flightId' },
    { title: '预定时间', dataIndex: 'created_at', key: 'created_at' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>订单管理</h2>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
}