"use client";
import { Card, Row, Col, Button, Tag } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  imageUrl?: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(async (res) => {
        try {
          const data = await res.json();
          setProducts(data);
        } catch {
          setProducts([]);
        }
      });
  }, []);

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <h2 style={{ color: "#1677ff", marginBottom: 24 }}>商城商品</h2>
      <Row gutter={[24, 24]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={product.imageUrl ? <img alt={product.name} src={product.imageUrl} style={{ height: 180, objectFit: "cover" }} /> : null}
              actions={[
                <Button type="primary" icon={<ShoppingCartOutlined />} block key="buy">
                  购买
                </Button>
              ]}
            >
              <Card.Meta
                title={<span>{product.name} <Tag color={product.stock > 0 ? "green" : "red"}>{product.stock > 0 ? "有货" : "缺货"}</Tag></span>}
                description={<>
                  <div style={{ color: '#1677ff', fontWeight: 700, marginBottom: 8 }}>￥{product.price.toFixed(2)}</div>
                  <div style={{ color: '#888', fontSize: 13 }}>{product.description}</div>
                </>}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
