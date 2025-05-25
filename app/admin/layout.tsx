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
          <button className="back-home-btn-admin">
            返回主页
          </button>
        </a>
      </div>
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-6" style={{minHeight:'100vh', overflow:'hidden', marginLeft:220}}>{children}</main>
    </div>
  );
}
