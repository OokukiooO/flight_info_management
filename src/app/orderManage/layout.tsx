/*
 * @Description: 
 * @Date: 2025-05-20 23:55:00
 * @LastEditTime: 2025-05-20 23:55:13
 * @FilePath: /flight_info_management/src/app/orderManage/layout.tsx
 */

import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{
        marginLeft: '5vw',
        width: '95vw',
        minHeight: '100vh',
        transition: 'margin-left 0.3s, width 0.3s',
        background: '#f5f5f5',
        padding: 32,
      }}>
        {children}
      </div>
    </div>
  );
}