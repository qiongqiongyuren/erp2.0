import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-row" style={{position:'relative'}}>
      {/* 返回主页按钮，右上角吸顶 */}
      <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 200 }}>
        <a href="/" style={{ textDecoration: 'none', display: 'block' }}>
          <button className="back-home-btn-admin">
            返回主页
          </button>
        </a>
      </div>
      <AdminSidebar />
      <main className="flex-1 bg-gray-50" style={{minHeight:'100vh', height:'100vh', overflow:'hidden', marginLeft:220, padding:0}}>{children}</main>
    </div>
  );
}
