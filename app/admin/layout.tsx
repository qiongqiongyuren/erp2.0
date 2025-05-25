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
        <style jsx global>{`
          .back-home-btn-admin {
            background: linear-gradient(90deg,#ffe066 0%,#ffb300 100%);
            color: #222;
            font-weight: 700;
            border-radius: 12px;
            font-size: 18px;
            box-shadow: 0 2px 8px #ffb30033;
            border: none;
            padding: 0 22px;
            height: 44px;
            transition: all .2s;
            cursor: pointer;
          }
          .back-home-btn-admin:hover {
            background: linear-gradient(90deg,#7f5fff 0%,#00c6ff 100%);
            color: #fff;
            box-shadow: 0 4px 16px #7f5fff33;
            transform: translateY(-2px) scale(1.05);
          }
        `}</style>
      </div>
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-6" style={{minHeight:'100vh', overflow:'hidden', marginLeft:220}}>{children}</main>
    </div>
  );
}
