"use client";
import { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker, Space, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface LedgerEntry {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "收入" | "支出";
}

export default function LedgerPage() {
  const [data, setData] = useState<LedgerEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const columns = [
    { title: "日期", dataIndex: "date", key: "date" },
    { title: "类型", dataIndex: "type", key: "type" },
    { title: "描述", dataIndex: "description", key: "description" },
    { title: "金额", dataIndex: "amount", key: "amount", render: (v:number) => `￥${v.toFixed(2)}` },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: LedgerEntry) => (
        <Space>
          <Button icon={<EditOutlined />} type="link" onClick={() => handleEdit(record)}>编辑</Button>
          <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: LedgerEntry) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // TODO: 调用删除API
    message.success("删除成功（示例，无实际删除）");
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        // TODO: 调用编辑API
        message.success("编辑成功（示例，无实际保存）");
      } else {
        // TODO: 调用新增API
        message.success("新增成功（示例，无实际保存）");
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch {}
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增账本记录</Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <Modal
        title={editingId ? "编辑账本记录" : "新增账本记录"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="日期" rules={[{ required: true, message: "请选择日期" }]}> <DatePicker style={{ width: "100%" }} /> </Form.Item>
          <Form.Item name="type" label="类型" rules={[{ required: true, message: "请选择类型" }]}> <Input /> </Form.Item>
          <Form.Item name="description" label="描述" rules={[{ required: true, message: "请输入描述" }]}> <Input /> </Form.Item>
          <Form.Item name="amount" label="金额" rules={[{ required: true, message: "请输入金额" }]}> <InputNumber min={0} style={{ width: "100%" }} /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
