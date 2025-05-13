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
