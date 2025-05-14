'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  InboxOutlined,
  LogoutOutlined,
  AccountBookOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Sider } = Layout;

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
      key: '/admin/accounting',
      icon: <AccountBookOutlined />,
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
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={200} style={{ background: '#fff' }}>
      <div style={{ height: 32, margin: 16, fontWeight: 'bold', fontSize: 20, color: '#1890ff', textAlign: 'center' }}>ERP后台</div>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
        onClick={({ key }) => {
          if (key === '/admin/login') {
            localStorage.removeItem('erp_user');
            router.push('/admin/login');
          } else {
            router.push(key);
          }
        }}
      />
    </Sider>
  );
}
