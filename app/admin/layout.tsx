import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-row" style={{position:'relative'}}>
      {/* 返回主页按钮 */}
      <div style={{ position: 'fixed', top: 24, left: 24, zIndex: 200 }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <button
            style={{
              background: 'linear-gradient(90deg,#ffe066 0%,#ffb300 100%)',
              color: '#222',
              fontWeight: 700,
              borderRadius: 12,
              fontSize: 18,
              boxShadow: '0 2px 8px #ffb30033',
              border: 'none',
              padding: '0 22px',
              height: 44,
              transition: 'all .2s',
              cursor: 'pointer',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'linear-gradient(90deg,#7f5fff 0%,#00c6ff 100%)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.boxShadow = '0 4px 16px #7f5fff33';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'linear-gradient(90deg,#ffe066 0%,#ffb300 100%)';
              e.currentTarget.style.color = '#222';
              e.currentTarget.style.boxShadow = '0 2px 8px #ffb30033';
              e.currentTarget.style.transform = 'none';
            }}
          >
            返回主页
          </button>
        </a>
      </div>
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-6" style={{minHeight:'100vh', overflow:'hidden', marginLeft:220}}>{children}</main>
    </div>
  );
}
