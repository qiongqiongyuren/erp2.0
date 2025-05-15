import AdminSidebar from "./components/AdminSidebar";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 简单鉴权：检查 localStorage 是否有 admin 登录标记
    if (typeof window !== "undefined") {
      const isAdmin = localStorage.getItem("erp_admin_login") === "1";
      if (!isAdmin && pathname !== "/admin/login") {
        router.replace("/admin/login");
      }
    }
  }, [pathname, router]);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
