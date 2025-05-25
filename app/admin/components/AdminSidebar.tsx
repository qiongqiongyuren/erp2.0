'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  InboxOutlined,
  LogoutOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Sider } = Layout;

const SIDEBAR_WIDTH = 220;

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const baseMenuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: '控制台',
    },
    {
      key: '/admin/customers',
      icon: <TeamOutlined />,
      label: '客户管理',
    },
    {
      key: '/admin/orders',
      icon: <ShoppingCartOutlined />,
      label: '订单管理',
    },
    {
      key: '/admin/products',
      icon: <InboxOutlined />,
      label: '库存管理',
    },
    {
      key: '/admin/raw-materials',
      icon: <AccountBookOutlined />,
      label: '原材料管理',
    },
    {
      key: '/admin/ledger',
      icon: <DollarCircleOutlined />,
      label: '账本管理',
    },
    {
      key: '/admin/login',
      icon: <LogoutOutlined />,
      label: '退出登录',
      style: { marginTop: 'auto' },
    },
  ];
  const [menuItems, setMenuItems] = useState(baseMenuItems);

  useEffect(() => {
    setMenuItems(baseMenuItems);
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={SIDEBAR_WIDTH}
      style={{
        minHeight: '100vh',
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 100,
        flex: `0 0 ${SIDEBAR_WIDTH}px`,
        maxWidth: SIDEBAR_WIDTH,
        minWidth: SIDEBAR_WIDTH,
        boxShadow: '2px 0 8px #f0f1f233',
      }}
    >
      <div style={{ height: 48, margin: 16, fontWeight: 700, fontSize: 20, color: '#1677ff', textAlign: 'center', letterSpacing: 2 }}>
        ERP后台
      </div>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={({ key }) => {
          if (key === '/admin/login') {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('erp_admin_login');
              localStorage.removeItem('erp_admin_role');
            }
            router.replace('/admin/login');
          } else {
            router.push(key);
          }
        }}
        style={{ height: '100%', borderRight: 0, fontSize: 16 }}
      />
    </Sider>
  );
}
