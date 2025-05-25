"use client";
import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.success) {
        // 兼容 role 字段在 data.role 或 data.user.role
        const role = data.role || (data.user && data.user.role) || "manager";
        message.success("登录成功");
        if (typeof window !== "undefined") {
          localStorage.setItem("erp_admin_login", "1");
          localStorage.setItem("erp_admin_role", role);
        }
        // 动态跳转首页，超级管理员跳转 /admin/dashboard，admin跳转 /admin/products，manager跳转 /admin/orders
        if (role === 'root') {
          router.replace("/admin/dashboard");
        } else if (role === 'admin') {
          router.replace("/admin/products");
        } else {
          router.replace("/admin/orders");
        }
      } else {
        message.error(data.message || "登录失败");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#e0e7ff 0%,#f0fdfa 100%)" }}>

      <Card style={{ width: 400, boxShadow: "0 2px 16px #a0aec033", borderRadius: 16, padding: 24 }}>
        <h2 style={{ textAlign: "center", color: "#1677ff", marginBottom: 24, fontSize: 20 }}>登录</h2>
        <div style={{ color: '#1677ff', fontSize: 14, textAlign: 'center', marginBottom: 8 }}>
          支持账号/密码：root/root123、admin/admin123、manager/manager123、user/user123
        </div>
        <div style={{ color: '#888', fontSize: 13, textAlign: 'center' }}>如需测试不同权限请切换账号</div>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off" initialValues={{}}>
          <Form.Item name="username" label="用户名" rules={[{ required: true, message: "请输入用户名" }]}> <Input size="large" style={{ borderRadius: 8, height: 40 }} autoComplete="username" /> </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, message: "请输入密码" }]}> <Input.Password size="large" style={{ borderRadius: 8, height: 40 }} autoComplete="current-password" /> </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} size="large" style={{ borderRadius: 8, height: 40, fontSize: 16 }}>
              登录
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("erp_admin_login");
              }
              router.replace("/admin/login");
            }}
            style={{ background: 'none', border: 'none', color: '#1677ff', cursor: 'pointer', fontSize: 13 }}
          >
            退出登录
          </button>
        </div>
      </Card>
    </div>
  );
}
