import Link from "next/link";
import { Button, Space, Card } from "antd";
import { ShopOutlined, AppstoreOutlined, TeamOutlined, ShoppingCartOutlined, LoginOutlined } from "@ant-design/icons";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
        padding: 0,
      }}
    >
      <Card
        style={{
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 4px 24px #a0aec033",
          borderRadius: 18,
          padding: 32,
          background: "rgba(255,255,255,0.96)",
        }}
        bodyStyle={{padding:0}}
      >
        <div style={{ marginBottom: 24 }}>
          <img src="/logo.svg" alt="ERP2.0" style={{ width: 64, height: 64, marginBottom: 12 }} />
          <h1 style={{ color: "#1677ff", fontWeight: 700, fontSize: 28, margin: 0, letterSpacing: 2 }}>ERP2.0 系统导航</h1>
          <p style={{ color: "#666", margin: "12px 0 0 0", fontSize: 15 }}>
            请选择要进入的功能模块：
          </p>
        </div>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Link href="/shop" passHref legacyBehavior>
            <Button
              type="primary"
              icon={<ShopOutlined />}
              block
              size="large"
              style={{ fontWeight: 600, fontSize: 22, letterSpacing: 2, height: 60, borderRadius: 12, background: "linear-gradient(90deg,#1677ff 60%,#66e0ff 100%)", boxShadow: "0 4px 16px #1677ff33" }}
              className="nav-btn"
            >
              前台商城
            </Button>
          </Link>
          <Link href="/admin/login" passHref legacyBehavior>
            <Button
              icon={<LoginOutlined />}
              block
              size="large"
              style={{ fontWeight: 600, fontSize: 22, letterSpacing: 2, height: 60, borderRadius: 12, background: "linear-gradient(90deg,#ffb300 60%,#ffe066 100%)", boxShadow: "0 4px 16px #ffb30033" }}
              className="nav-btn"
            >
              后台管理
            </Button>
          </Link>
        </Space>
        <style>{`
          .nav-btn:hover {
            background: #e0f2fe !important;
            color: #1677ff !important;
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 6px 24px #1677ff22;
          }
        `}</style>
      </Card>
    </main>
  );
}
