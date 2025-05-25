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

  const onFinishFailed = (errorInfo: any) => {
    // 直接弹窗显示校验失败信息
    message.error(
      errorInfo.errorFields && errorInfo.errorFields.length > 0
        ? errorInfo.errorFields.map((f:any) => f.errors.join(', ')).join(' | ')
        : '表单校验失败');
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{}}
        style={{ maxWidth: 320, margin: '80px auto' }}
      >
        <Form.Item name="username" label="用户名" rules={[{ required: true, message: "请输入用户名" }]}> <Input autoComplete="username" /> </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: "请输入密码" }]}> <Input.Password autoComplete="current-password" /> </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>登录</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
