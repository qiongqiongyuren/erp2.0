import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ERP 管理系统",
  description: "企业资源管理系统",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div style={{ position: 'fixed', top: 24, right: 32, zIndex: 200 }}>
          <a href="/login" style={{ textDecoration: 'none' }}>
            <button className="login-btn-front">注册/登录</button>
          </a>
        </div>
        {children}
      </body>
    </html>
  );
}
