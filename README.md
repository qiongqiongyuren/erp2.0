# ERP2.0

全栈 Node.js (Next.js) 项目模板，支持 Vercel 部署与 PostgreSQL 数据库。

## 快速开始

1. 安装依赖：`npm install`
2. 开发启动：`npm run dev`
3. 构建生产：`npm run build && npm start`
4. 数据库配置：在 `.env` 文件中填写 `DATABASE_URL`
5. 推送到 GitHub 后，Vercel 直接导入仓库即可自动部署。

## 目录结构
- `/app`：前端页面与后端 API（全栈）
- `/prisma`：Prisma ORM 配置
- `/node_modules`：依赖

## 环境变量
- `DATABASE_URL`：PostgreSQL 连接字符串

---

## 主要功能

### 1. 角色权限系统
- 支持四种角色：
  - `root`（超级管理员）：拥有全部权限
  - `admin`（高级管理员）：部分高级管理权限
  - `manager`（普通管理员）：基础管理权限
  - `user`（普通用户）：仅可访问部分内容
- 登录后根据角色自动跳转到对应页面。

### 2. 后台管理功能
- 侧边栏导航，点击后页面内容在右侧展示，适配大屏与小屏。
- 管理模块：
  - 仪表盘（Dashboard）：查看产品、客户、订单、原材料等统计数据
  - 产品管理：产品的增删改查，支持图片上传
  - 订单管理、客户管理、原材料管理等
- 所有管理页面均基于 Ant Design 组件库实现。

### 3. 动画与美化
- 不同角色登录后台有不同的动画背景效果
- 管理面板采用渐变背景、大按钮、响应式布局

### 4. 安全性
- 仅有权限的用户可访问对应管理页面，未授权自动重定向

### 5. 技术栈
- Next.js 14
- Prisma ORM
- PostgreSQL
- Ant Design

---
