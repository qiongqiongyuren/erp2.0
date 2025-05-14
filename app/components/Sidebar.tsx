"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const { Sider } = Layout;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: "/",
      icon: <AppstoreOutlined />,
      label: "首页",
    },
    {
      key: "/products",
      icon: <ShoppingCartOutlined />,
      label: "产品管理",
    },
    {
      key: "/customers",
      icon: <TeamOutlined />,
      label: "客户管理",
    },
    {
      key: "/orders",
      icon: <UserOutlined />,
      label: "订单管理",
    },
  ];

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={200} style={{ background: "#fff" }}>
      <div style={{ height: 32, margin: 16, fontWeight: "bold", fontSize: 20, color: "#1890ff", textAlign: "center" }}>ERP前台</div>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        style={{ height: "100%", borderRight: 0 }}
        items={menuItems}
        onClick={({ key }) => router.push(key)}
      />
    </Sider>
  );
}
