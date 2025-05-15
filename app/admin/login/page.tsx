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
      if (res.ok) {
        message.success("登录成功");
        localStorage.setItem("erp_user", values.username);
        router.push("/admin/dashboard");
      } else {
        message.error("用户名或密码错误");
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
        <div style={{ color: '#888', fontSize: 13, textAlign: 'center' }}>默认管理员：admin / admin</div>
      </Card>
    </div>
  );
}
