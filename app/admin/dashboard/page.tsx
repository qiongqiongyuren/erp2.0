"use client";
import { Card, Row, Col, Statistic } from "antd";
import { AppstoreOutlined, TeamOutlined, ShoppingCartOutlined, InboxOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    orders: 0,
    materials: 0,
  });

  useEffect(() => {
    // 示例：实际可调用后端API统计数据
    setStats({ products: 32, customers: 18, orders: 45, materials: 12 });
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ color: "#1677ff", marginBottom: 24 }}>后台控制台</h2>
      <Row gutter={24}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="产品数" value={stats.products} prefix={<AppstoreOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="客户数" value={stats.customers} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="订单数" value={stats.orders} prefix={<ShoppingCartOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="原材料数" value={stats.materials} prefix={<InboxOutlined />} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
