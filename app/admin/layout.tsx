import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-row">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-6 overflow-x-auto">{children}</main>
    </div>
  );
}
