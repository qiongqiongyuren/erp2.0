"use client";
import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, action: "loginOrRegister" })
      });
      const data = await res.json();
      if (data.success) {
        message.success("登录成功");
        router.replace("/");
      } else {
        message.error(data.message || "登录或注册失败");
      }
    } catch (e) {
      message.error("网络错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f6fa" }}>
      <div style={{ width: 380, background: "#fff", borderRadius: 16, boxShadow: "0 8px 32px #7f5fff22", padding: 36 }}>
        <h2 style={{ textAlign: "center", fontWeight: 800, fontSize: 28, marginBottom: 32, background: "linear-gradient(90deg,#7f5fff,#00c6ff,#ffb300 80%)", WebkitBackgroundClip: "text", color: "transparent" }}>客户注册/登录</h2>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item name="email" label="邮箱" rules={[{ required: true, message: "请输入邮箱" }, { type: "email", message: "邮箱格式不正确" }]}> <Input size="large" placeholder="请输入邮箱" /> </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, message: "请输入密码" }, { min: 6, message: "密码至少6位" }]}> <Input.Password size="large" placeholder="请输入密码" /> </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading} style={{ fontWeight: 700, borderRadius: 10, background: "linear-gradient(90deg,#7f5fff 60%,#00c6ff 100%)", border: "none" }}>注册/登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
