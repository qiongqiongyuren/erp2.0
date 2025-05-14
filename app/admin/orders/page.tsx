"use client";

import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, Space, message, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalAmount: number;
  products: string[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const statusColors = {
    pending: 'gold',
    processing: 'blue',
    completed: 'green',
    cancelled: 'red',
  };

  const statusText = {
    pending: '待处理',
    processing: '处理中',
    completed: '已完成',
    cancelled: '已取消',
  };

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '订单日期',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: keyof typeof statusColors) => (
        <Tag color={statusColors[status]}>
          {statusText[status]}
        </Tag>
      ),
    },
    {
      title: '总金额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (v:number) => `¥${v.toFixed(2)}`,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Order) => (
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

  const handleEdit = (record: Order) => {
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
          新增订单
        </Button>
      </div>
      <Table columns={columns} dataSource={orders} rowKey="id" />
      <Modal
        title={editingId ? '编辑订单' : '新增订单'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="customerName" label="客户名称" rules={[{ required: true, message: '请输入客户名称' }]}> <Input /> </Form.Item>
          <Form.Item name="orderDate" label="订单日期" rules={[{ required: true, message: '请输入订单日期' }]}> <Input /> </Form.Item>
          <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}> <Select options={Object.keys(statusText).map(k => ({ value: k, label: statusText[k as keyof typeof statusText] }))} /> </Form.Item>
          <Form.Item name="totalAmount" label="总金额" rules={[{ required: true, message: '请输入总金额' }]}> <InputNumber min={0} style={{ width: '100%' }} /> </Form.Item>
          <Form.Item name="products" label="产品"> <Input /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
