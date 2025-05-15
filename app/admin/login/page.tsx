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
        }
        router.replace("/admin/dashboard");
      } else {
        message.error(data.message || "登录失败");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#e0e7ff 0%,#f0fdfa 100%)" }}>
      <Card style={{ width: 350, boxShadow: "0 2px 16px #a0aec033", borderRadius: 16 }}>
        <h2 style={{ textAlign: "center", color: "#1677ff", marginBottom: 24 }}>后台登录</h2>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item name="username" label="用户名" rules={[{ required: true, message: "请输入用户名" }]}> <Input /> </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, message: "请输入密码" }]}> <Input.Password /> </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
        <div style={{ color: '#888', fontSize: 13, textAlign: 'center' }}>默认账号：admin / admin</div>
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
