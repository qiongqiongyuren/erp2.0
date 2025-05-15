"use client";

import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Upload, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  imageUrl?: string;
}

"use client";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Upload, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

export default function ProductsPage() {
  // 动态动画效果
  let animation: React.ReactNode = null;
  if (typeof window !== 'undefined') {
    const role = localStorage.getItem('erp_admin_role');
    if (role === 'root') {
      animation = (
        <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}}>
          <div className="super-root-glow" />
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
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

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

  const uploadProps: UploadProps = {
    name: 'file',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  const columns = [
    {
      title: '商品编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toFixed(2)}`,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Tag color={stock > 10 ? 'green' : stock > 0 ? 'gold' : 'red'}>
          {stock}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Product) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    // TODO: 调用删除API
    message.success('删除成功（示例，无实际删除）');
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        // TODO: 调用编辑API
        message.success('编辑成功（示例，无实际保存）');
      } else {
        // TODO: 调用新增API
        message.success('新增成功（示例，无实际保存）');
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch {}
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增产品
        </Button>
      </div>
      <Table columns={columns} dataSource={products} rowKey="id" />
      <Modal
        title={editingId ? '编辑产品' : '新增产品'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="产品名称" rules={[{ required: true, message: '请输入产品名称' }]}> <Input /> </Form.Item>
          <Form.Item name="price" label="价格" rules={[{ required: true, message: '请输入价格' }]}> <InputNumber min={0} style={{ width: '100%' }} /> </Form.Item>
          <Form.Item name="stock" label="库存" rules={[{ required: true, message: '请输入库存' }]}> <InputNumber min={0} style={{ width: '100%' }} /> </Form.Item>
          <Form.Item name="category" label="分类"> <Input /> </Form.Item>
          <Form.Item name="description" label="描述"> <Input.TextArea rows={2} /> </Form.Item>
          <Form.Item name="imageUrl" label="图片"> <Upload {...uploadProps}><Button icon={<UploadOutlined />}>上传图片</Button></Upload> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
