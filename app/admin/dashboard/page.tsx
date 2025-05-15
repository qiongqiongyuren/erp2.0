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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, customersRes, ordersRes, materialsRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/customers'),
          fetch('/api/orders'),
          fetch('/api/raw-materials'),
        ]);
        const [products, customers, orders, materials] = await Promise.all([
          productsRes.json(),
          customersRes.json(),
          ordersRes.json(),
          materialsRes.json(),
        ]);
        setStats({
          products: Array.isArray(products) ? products.length : 0,
          customers: Array.isArray(customers) ? customers.length : 0,
          orders: Array.isArray(orders) ? orders.length : 0,
          materials: Array.isArray(materials) ? materials.length : 0,
        });
      } catch {
        setStats({ products: 0, customers: 0, orders: 0, materials: 0 });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ color: "#1677ff", marginBottom: 24 }}>后台控制台</h2>
      {loading ? (
        <div style={{ textAlign: 'center', margin: 60 }}><span className="ant-spin ant-spin-lg" /></div>
      ) : (
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
      )}
    </div>
  );
}
