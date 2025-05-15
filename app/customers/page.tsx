"use client";
import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Customer) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
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

  const handleEdit = (record: Customer) => {
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
        <Button type="primary" icon={<UserAddOutlined />} onClick={handleAdd}>
          新增客户
        </Button>
      </div>
      <Table columns={columns} dataSource={customers} rowKey="id" />
      <Modal
        title={editingId ? '编辑客户' : '新增客户'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="客户名称" rules={[{ required: true, message: '请输入客户名称' }]}> <Input /> </Form.Item>
          <Form.Item name="phone" label="电话" rules={[{ required: true, message: '请输入电话' }]}> <Input /> </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}> <Input /> </Form.Item>
          <Form.Item name="address" label="地址"> <Input /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
