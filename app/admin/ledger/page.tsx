"use client";
import { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, DatePicker, Space, message, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "react";

interface LedgerEntry {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "收入" | "支出";
}

export default function LedgerPage() {
  const [data, setData] = useState<LedgerEntry[]>([]);
  useEffect(() => {
    fetch('/api/ledger').then(async (res) => {
      try {
        const d = await res.json();
        setData(Array.isArray(d) ? d : []);
      } catch {
        setData([]);
      }
    });
  }, []);
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

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/ledger?id=${id}`, { method: 'DELETE' });
      const result = await res.json();
      if(result.success){
        setData(data.filter(item=>item.id!==id));
        message.success('删除成功');
      }else{
        message.error(result.message||'删除失败');
      }
    }catch{message.error('删除失败');}
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      let result;
      if (editingId) {
        result = await fetch('/api/ledger', { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ ...values, id: editingId }) });
      } else {
        result = await fetch('/api/ledger', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(values) });
      }
      const res = await result.json();
      if(res.success){
        // 重新拉取数据
        const d = await fetch('/api/ledger').then(r=>r.json());
        setData(Array.isArray(d)?d:[]);
        message.success(editingId?'编辑成功':'新增成功');
        setIsModalOpen(false);
        form.resetFields();
      }else{
        message.error(res.message||'操作失败');
      }
    } catch {}
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 sticky top-0 z-20 bg-white" style={{paddingTop:8, paddingBottom:8}}>
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
          <Form.Item name="type" label="类型" rules={[{ required: true, message: "请选择类型" }]}> <Select options={[{value:'收入',label:'收入'},{value:'支出',label:'支出'}]} /> </Form.Item>
          <Form.Item name="description" label="描述" rules={[{ required: true, message: "请输入描述" }]}> <Input /> </Form.Item>
          <Form.Item name="amount" label="金额" rules={[{ required: true, message: "请输入金额" }]}> <InputNumber min={0} style={{ width: "100%" }} /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
