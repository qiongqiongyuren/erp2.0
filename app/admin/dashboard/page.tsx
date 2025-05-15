"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, Row, Col, Statistic } from "antd";
import { AppstoreOutlined, TeamOutlined, ShoppingCartOutlined, InboxOutlined } from "@ant-design/icons";

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdmin = localStorage.getItem("erp_admin_login") === "1";
      if (!isAdmin) {
        router.replace("/admin/login");
      }
    }
  }, [router]);
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
        <div>
          {(() => {
            let animation: React.ReactNode = null;
            if (typeof window !== 'undefined') {
              const role = localStorage.getItem('erp_admin_role');
              if (role === 'root') {
                animation = (
                  <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}}>
                    <div className="super-root-glow" />
                    {/* 可用canvas粒子或svg动画增强 */}
                  </div>
                );
              } else if (role === 'admin') {
                animation = (
                  <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none',background:'linear-gradient(135deg,#e0e7ff55 0%,#f0fdfa55 100%)'}} />
                );
              } else if (role === 'manager') {
                animation = (
                  <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none',background:'rgba(22,119,255,0.05)'}} />
                );
              }
            }
            return animation;
          })()}
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
      )}
    </div>
  );
}
