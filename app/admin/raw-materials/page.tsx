"use client";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, message, Space } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface RawMaterial {
  id: string;
  name: string;
  price: number;
  stock: number;
  unit: string;
  description?: string;
}

export default function RawMaterialsPage() {
  // ...原有state
  const [importing, setImporting] = useState(false);

  // Excel导入逻辑
  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/raw-materials/import', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        message.success(`成功导入 ${result.count} 条原材料数据`);
        // 重新加载表格
        fetch("/api/raw-materials")
          .then(async (res) => {
            try {
              const data = await res.json();
              setMaterials(data);
            } catch {
              setMaterials([]);
            }
          });
      } else {
        message.error(result.message || '导入失败');
      }
    } catch (e) {
      message.error('导入失败');
    }
    setImporting(false);
    e.target.value = '';
  };

  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/raw-materials")
      .then(async (res) => {
        try {
          const data = await res.json();
          setMaterials(data);
        } catch {
          setMaterials([]);
        }
      });
  }, []);

  const columns = [
    { title: "原材料编号", dataIndex: "id", key: "id" },
    { title: "名称", dataIndex: "name", key: "name" },
    { title: "单价", dataIndex: "price", key: "price", render: (v:number) => `¥${v.toFixed(2)}` },
    { title: "库存", dataIndex: "stock", key: "stock" },
    { title: "单位", dataIndex: "unit", key: "unit" },
    { title: "描述", dataIndex: "description", key: "description" },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: RawMaterial) => (
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

  const handleEdit = (record: RawMaterial) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要删除这条原材料吗？')) return;
    
    try {
      const res = await fetch(`/api/raw-materials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        message.success('删除成功');
        // 刷新表格
        fetch("/api/raw-materials")
          .then(async (res) => {
            try {
              const data = await res.json();
              setMaterials(data);
            } catch {
              setMaterials([]);
            }
          });
      } else {
        const result = await res.json();
        message.error(result.error || '删除失败');
      }
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('原材料表单提交内容:', values);
      // 只提交必要字段
      const { name, price, stock, unit, description } = values;
      const data = { name, price, stock, unit, description };
      
      if (editingId) {
        // 编辑原材料
        const res = await fetch(`/api/raw-materials/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (res.ok) {
          message.success('编辑成功');
        } else {
          message.error(result.error || '编辑失败');
          return;
        }
      } else {
        // 新增原材料
        const res = await fetch('/api/raw-materials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (res.ok) {
          message.success('新增成功');
        } else {
          message.error(result.error || '新增失败');
          return;
        }
      }
      // 刷新表格
      fetch("/api/raw-materials")
        .then(async (res) => {
          try {
            const data = await res.json();
            setMaterials(data);
          } catch {
            setMaterials([]);
          }
        });
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('操作失败:', error);
      message.error('操作失败');
    }
  };


  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增原材料
          </Button>
          <input
            type="file"
            accept=".xlsx"
            style={{ display: 'none' }}
            id="excel-upload"
            onChange={handleImportExcel}
          />
          <Button style={{ marginLeft: 12 }} onClick={() => document.getElementById('excel-upload')?.click()}>
            导入 Excel
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={materials} rowKey="id" />
      <Modal
        title={editingId ? '编辑原材料' : '新增原材料'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="名称"> <Input /> </Form.Item>
          <Form.Item name="price" label="单价"> <InputNumber min={0} style={{ width: '100%' }} /> </Form.Item>
          <Form.Item name="stock" label="库存"> <InputNumber min={0} style={{ width: '100%' }} /> </Form.Item>
          <Form.Item name="unit" label="单位"> <Input /> </Form.Item>
          <Form.Item name="description" label="描述"> <Input.TextArea rows={2} /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
