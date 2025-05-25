import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-row" style={{position:'relative'}}>
      {/* 返回主页按钮，紧贴页面最左侧吸顶 */}
      <div style={{ position: 'fixed', top: 24, left: 0, zIndex: 200, width: 60, display: 'flex', justifyContent: 'center' }}>
        <a href="/" style={{ textDecoration: 'none', display: 'block' }}>
          <button className="back-home-btn-admin">
            返回主页
          </button>
        </a>
      </div>
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-6" style={{minHeight:'100vh', height:'100vh', overflow:'hidden', marginLeft:220}}>{children}</main>
    </div>
  );
}
