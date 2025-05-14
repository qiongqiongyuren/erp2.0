import Link from "next/link";
import { Button, Space, Card } from "antd";

export default function Home() {
  return (
    <main style={{ padding: 40, minHeight: '100vh', background: '#f7f7f7' }}>
      <Card style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center', boxShadow: '0 2px 8px #f0f1f2' }}>
        <h1 style={{ color: '#1677ff', marginBottom: 16 }}>ERP2.0 系统导航</h1>
        <p style={{ color: '#666', marginBottom: 32 }}>
          请选择要进入的功能模块：
        </p>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Link href="/shop"><Button type="primary" block size="large">前台商城</Button></Link>
          <Link href="/products"><Button block size="large">产品管理</Button></Link>
          <Link href="/customers"><Button block size="large">客户管理</Button></Link>
          <Link href="/orders"><Button block size="large">订单管理</Button></Link>
          <Link href="/admin/login"><Button type="dashed" block size="large">进入后台管理</Button></Link>
        </Space>
      </Card>
    </main>
  );
}
