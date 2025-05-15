import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-row" style={{position:'relative'}}>
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-6" style={{minHeight:'100vh', overflow:'auto', marginLeft:220}}>{children}</main>
    </div>
  );
}
