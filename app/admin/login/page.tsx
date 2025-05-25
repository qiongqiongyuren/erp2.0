"use client";
import { useState } from "react";
import { message } from "antd";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!username || !password) {
      message.error("请输入用户名和密码");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        const role = data.role || (data.user && data.user.role) || "manager";
        message.success("登录成功");
        if (typeof window !== "undefined") {
          localStorage.setItem("erp_admin_login", "1");
          localStorage.setItem("erp_admin_role", role);
        }
        if (role === "root") {
          router.replace("/admin/dashboard");
        } else if (role === "admin") {
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
    <div>
      <form
        style={{ maxWidth: 320, margin: '80px auto', display: 'flex', flexDirection: 'column', gap: 16 }}
        onSubmit={e => { e.preventDefault(); handleSubmit(); }}
        autoComplete="off"
      >
        <label>用户名</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoComplete="username"
          style={{ height: 40, borderRadius: 8, border: '1px solid #ddd', padding: 8, fontSize: 16 }}
        />
        <label>密码</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          style={{ height: 40, borderRadius: 8, border: '1px solid #ddd', padding: 8, fontSize: 16 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ height: 40, borderRadius: 8, background: '#1677ff', color: '#fff', fontSize: 16, border: 'none', marginTop: 16 }}
        >
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
    </div>
  );
}
