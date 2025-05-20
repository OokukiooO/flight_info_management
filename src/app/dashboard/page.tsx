/*
 * @Description: 
 * @Date: 2025-05-18 20:02:32
 * @LastEditTime: 2025-05-18 20:21:16
 * @FilePath: \flight_info_management\src\app\dashboard\page.tsx
 */

'use client';
import { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Spin } from 'antd';
import { UserOutlined, TableOutlined, OrderedListOutlined } from '@ant-design/icons';

export default function DashboardPage() {
  type Stats = {
    userCount: number;
    flightCount: number;
    orderCount: number;
  };
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/dashboard/stats').then(res => res.json()).then(setStats);
  }, []);

  if (!stats) return <Spin />;

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 24, color: 'black' }}>欢迎使用航班信息管理系统</h1>
      <Row gutter={24}>
        <Col span={8}>
          <Card>
            <Statistic title="用户总数" value={stats.userCount} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="航班总数" value={stats.flightCount} prefix={<TableOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="订单总数" value={stats.orderCount} prefix={<OrderedListOutlined />} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}