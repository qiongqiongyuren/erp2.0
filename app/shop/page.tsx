"use client";
import { Card, Row, Col, Button, Tag, Empty, Spin } from "antd";
import { ShoppingCartOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  imageUrl?: string;
}

import Link from "next/link";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(async (res) => {
        try {
          const data = await res.json();
          setProducts(Array.isArray(data) ? data : []);
        } catch {
          setProducts([]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at 20% 20%, #f5e8ff 0%, #e0e7ff 60%, #b7eaff 100%)',
        padding: 0,
        position: 'relative',
      }}
    >
      {/* 顶部返回首页按钮 */}
      <div style={{ position: 'fixed', top: 32, left: 32, zIndex: 100 }}>
        <Link href="/" passHref legacyBehavior>
          <Button
            icon={<AppstoreOutlined />}
            style={{
              background: 'linear-gradient(90deg,#ffe066 0%,#ffb300 100%)',
              color: '#222',
              fontWeight: 700,
              borderRadius: 12,
              fontSize: 18,
              boxShadow: '0 2px 8px #ffb30033',
              border: 'none',
              padding: '0 22px',
              height: 48,
              transition: 'all .2s',
            }}
            className="back-home-btn"
          >
            返回首页
          </Button>
        </Link>
      </div>
      {/* 标题和商品 */}
      <div style={{ padding: '48px 24px 24px 24px', maxWidth: 1300, margin: '0 auto', background: '#fff', borderRadius: 20, boxShadow: '0 2px 24px #e0e7ff66' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2
            style={{
              color: '#333',
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 0,
            }}
          >
            <span style={{}}>商城商品</span>
          </h2>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button type="default" style={{ fontWeight: 600, borderRadius: 8, border: '1.5px solid #7f5fff', color: '#7f5fff', background:'#fff' }}>全部商品</Button>
            <Button type="default" style={{ fontWeight: 600, borderRadius: 8, border: '1.5px solid #ffb300', color: '#ffb300', background:'#fffbe6' }}>热销推荐</Button>
            <Button type="default" style={{ fontWeight: 600, borderRadius: 8, border: '1.5px solid #00c6ff', color: '#00c6ff', background:'#e0f7ff' }}>筛选</Button>
            <Button type="default" style={{ fontWeight: 600, borderRadius: 8, border: '1.5px solid #bbb', color: '#888', background:'#f5f5f5' }}>联系客服</Button>
            <Button type="primary" style={{ fontWeight: 700, borderRadius: 8, background:'linear-gradient(90deg,#7f5fff 60%,#00c6ff 100%)', border:'none' }}>我的订单</Button>
          </div>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', margin: 60 }}><Spin size="large" /></div>
        ) : products.length === 0 ? (
          <Empty description="暂无商品" style={{ margin: 60 }} />
        ) : (
          <Row gutter={[32, 32]}>
            {products.map((product, idx) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 20,
                    boxShadow: '0 6px 32px 0 #a0e7ff33, 0 2px 12px #7f5fff22',
                    border: '3px solid',
                    borderImage: 'linear-gradient(120deg,#7f5fff,#00c6ff,#ffe066,#ffb300) 1',
                    background: '#fff',
                    transition: 'box-shadow .3s,transform .15s',
                  }}
                  bodyStyle={{ padding: 18, minHeight: 160 }}
                  cover={product.imageUrl ? (
                    <img
                      alt={product.name}
                      src={product.imageUrl}
                      style={{
                        height: 190,
                        objectFit: 'cover',
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        borderBottom: '2px solid #e0e7ff',
                        filter: 'drop-shadow(0 2px 8px #a0e7ff66)',
                        transition: 'transform .2s',
                        transform: 'scale(1)',
                      }}
                      className="shop-img"
                    />
                  ) : (
                    <div
                      style={{
                        height: 190,
                        background: 'linear-gradient(120deg,#f0f1f2,#e0e7ff 80%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#bbb',
                        fontSize: 32,
                        borderTopLeftRadius: 18,
                        borderTopRightRadius: 18,
                        borderBottom: '2px solid #e0e7ff',
                      }}
                    >
                      无图
                    </div>
                  )}
                  actions={[
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      block
                      key="buy"
                      style={{
                        background:
                          'linear-gradient(90deg,#7f5fff 60%,#00c6ff 100%)',
                        color: '#fff',
                        fontWeight: 700,
                        borderRadius: 10,
                        fontSize: 18,
                        boxShadow: '0 2px 12px #7f5fff33',
                        border: 'none',
                        height: 44,
                        margin: '0 12px 8px 12px',
                        transition: 'all .18s',
                      }}
                      className="buy-btn"
                    >
                      购买
                    </Button>,
                    <Button
                      type="default"
                      key="add-cart"
                      style={{
                        fontWeight: 600,
                        borderRadius: 10,
                        fontSize: 16,
                        border: '1.5px solid #7f5fff',
                        color: '#7f5fff',
                        margin: '0 12px 8px 12px',
                        height: 40,
                        background: '#fff',
                        transition: 'all .18s',
                      }}
                      className="cart-btn"
                    >
                      加入购物车
                    </Button>,
                    <Button
                      type="default"
                      key="fav"
                      style={{
                        fontWeight: 600,
                        borderRadius: 10,
                        fontSize: 16,
                        border: '1.5px solid #ffb300',
                        color: '#ffb300',
                        margin: '0 12px 8px 12px',
                        height: 40,
                        background: '#fffbe6',
                        transition: 'all .18s',
                      }}
                      className="fav-btn"
                    >
                      收藏
                    </Button>,
                    <Button
                      type="link"
                      key="detail"
                      style={{
                        fontWeight: 500,
                        fontSize: 15,
                        color: '#1677ff',
                        margin: '0 12px 12px 12px',
                        height: 38,
                        padding: 0,
                      }}
                      className="detail-btn"
                    >
                      查看详情
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={
                      <span style={{ fontWeight: 800, fontSize: 20, color: '#7f5fff', letterSpacing: 1 }}>
                        {product.name} <Tag color={product.stock > 0 ? "green" : "red"}>{product.stock > 0 ? "有货" : "缺货"}</Tag>
                      </span>
                    }
                    description={
                      <>
                        <div
                          style={{
                            color: '#00c6ff',
                            fontWeight: 700,
                            fontSize: 18,
                            marginBottom: 6,
                            textShadow: '0 1px 6px #00c6ff33',
                          }}
                        >
                          ￥{product.price.toFixed(2)}
                        </div>
                        <div style={{ color: '#888', fontSize: 13, marginBottom: 6 }}>
                          {product.description || '暂无描述'}
                        </div>
                        <div style={{ fontSize: 12, color: '#bbb' }}>
                          分类：{product.category}
                        </div>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <style jsx global>{`
        .buy-btn:hover {
          background: linear-gradient(90deg,#ffe066 0%,#ffb300 100%) !important;
          color: #7f5fff !important;
          box-shadow: 0 4px 24px #ffe06688;
          transform: translateY(-2px) scale(1.04);
        }
        .back-home-btn:hover {
          background: linear-gradient(90deg,#7f5fff 0%,#00c6ff 100%) !important;
          color: #fff !important;
          box-shadow: 0 4px 16px #7f5fff33;
          transform: translateY(-2px) scale(1.05);
        }
        .ant-card:hover {
          box-shadow: 0 8px 32px #00c6ff33, 0 2px 12px #7f5fff22 !important;
          border-color: #7f5fff !important;
          transform: translateY(-4px) scale(1.03);
        }
        .shop-img:hover {
          transform: scale(1.04) rotate(-2deg);
          filter: drop-shadow(0 4px 16px #7f5fff66);
        }
      `}</style>
    </div>
  );
}
