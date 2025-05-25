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
        message.success("登录成功");
        if (typeof window !== "undefined") {
          localStorage.setItem("erp_admin_login", "1");
          localStorage.setItem("erp_admin_role", data.role || "manager");
        }
        // 动态跳转首页，超级管理员跳转 /admin/dashboard，admin跳转 /admin/products，manager跳转 /admin/orders
        if (data.role === 'root') {
          router.replace("/admin/dashboard");
        } else if (data.role === 'admin') {
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
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <img src="logo.png" alt="logo" style={{ width: 40, height: 40, marginRight: 12 }} />
        <h1 style={{ color: "#1677ff", fontSize: 24, fontWeight: 600 }}>后台管理系统</h1>
      </div>
      <Card style={{ width: 400, boxShadow: "0 2px 16px #a0aec033", borderRadius: 16, padding: 24 }}>
        <h2 style={{ textAlign: "center", color: "#1677ff", marginBottom: 24, fontSize: 20 }}>登录</h2>
        <div style={{ color: '#1677ff', fontSize: 14, textAlign: 'center', marginBottom: 8 }}>
          支持账号/密码：root/root123、admin/admin123、manager/manager123、user/user123
        </div>
        <div style={{ color: '#888', fontSize: 13, textAlign: 'center' }}>如需测试不同权限请切换账号</div>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item name="username" label="用户名" rules={[{ required: true, message: "请输入用户名" }]}> <Input size="large" style={{ borderRadius: 8, height: 40 }} /> </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, message: "请输入密码" }]}> <Input.Password size="large" style={{ borderRadius: 8, height: 40 }} /> </Form.Item>
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
