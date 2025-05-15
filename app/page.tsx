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
              style={{ fontWeight: 500, fontSize: 18, transition: "all .2s", boxShadow: "0 2px 8px #1677ff22" }}
              className="nav-btn"
            >
              前台商城
            </Button>
          </Link>
          <Link href="/products" passHref legacyBehavior>
            <Button
              icon={<AppstoreOutlined />}
              block
              size="large"
              style={{ fontWeight: 500, fontSize: 18, transition: "all .2s" }}
              className="nav-btn"
            >
              产品管理
            </Button>
          </Link>
          <Link href="/customers" passHref legacyBehavior>
            <Button
              icon={<TeamOutlined />}
              block
              size="large"
              style={{ fontWeight: 500, fontSize: 18, transition: "all .2s" }}
              className="nav-btn"
            >
              客户管理
            </Button>
          </Link>
          <Link href="/orders" passHref legacyBehavior>
            <Button
              icon={<ShoppingCartOutlined />}
              block
              size="large"
              style={{ fontWeight: 500, fontSize: 18, transition: "all .2s" }}
              className="nav-btn"
            >
              订单管理
            </Button>
          </Link>
          <Link href="/admin/login" passHref legacyBehavior>
            <Button
              type="dashed"
              icon={<LoginOutlined />}
              block
              size="large"
              style={{ fontWeight: 500, fontSize: 18, transition: "all .2s" }}
              className="nav-btn"
            >
              进入后台管理
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
