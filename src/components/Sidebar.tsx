'use client';
import { useState } from 'react';
import { Menu, Button } from 'antd';
import {
  DashboardOutlined,
  SearchOutlined,
  OrderedListOutlined,
  TableOutlined,
  EditOutlined,
  PlusOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const menuItems = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: '欢迎页' },
  { key: '/flightSearching', icon: <SearchOutlined />, label: '航班查询' },
  { key: '/orderManage', icon: <OrderedListOutlined />, label: '订单管理' },
  { key: '/flightManage', icon: <TableOutlined />, label: '航班管理' },
  { key: '/flightEdit', icon: <EditOutlined />, label: '修改航班' },
  { key: '/flightAdd', icon: <PlusOutlined />, label: '添加航班' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      style={{
        width: collapsed ? '5vw' : '10vw',
        minWidth: 80,
        maxWidth: 320,
        height: '100vh',
        transition: 'width 0.3s',
        background: '#001529',
        color: '#fff',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: 16, textAlign: 'center', fontWeight: 'bold', color: '#fff' }}>
        <span style={{ fontSize: 24 }}>✈️</span>
        {!collapsed && <span style={{ marginLeft: 8 }}>航班管理</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        inlineCollapsed={collapsed}
        items={menuItems}
        onClick={({ key }) => router.push(key)}
        style={{ flex: 1 }}
      />
      <div style={{ padding: 16, textAlign: 'center' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed((c) => !c)}
          style={{ color: '#fff', width: '100%' }}
        />
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={async () => {
            await fetch('/api/user/logout', { method: 'POST' });
            router.push('/login');
          }}
          style={{ color: '#fff', width: '100%', marginTop: 8 }}
        >
          {!collapsed && '退出登录'}
        </Button>
      </div>
    </div>
  );
}