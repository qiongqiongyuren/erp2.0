"use client";
import { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";

export default function AdminSettings() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    // TODO: 保存设置到数据库
    setTimeout(() => {
      message.success("设置已保存（示例，无实际保存）");
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 480, margin: '40px auto' }}>
      <Card title="系统设置" bordered={false}>
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ company: '', contact: '' }}>
          <Form.Item name="company" label="公司名称" rules={[{ required: true, message: '请输入公司名称' }]}> <Input /> </Form.Item>
          <Form.Item name="contact" label="联系方式" rules={[{ required: true, message: '请输入联系方式' }]}> <Input /> </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              保存设置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
