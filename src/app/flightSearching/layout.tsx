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