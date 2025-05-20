'use client';
import { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation';

export default function FlightEdit() {
  const [form] = Form.useForm();
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get('id');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch('/api/flight/search?' + new URLSearchParams({ id })).then(res => res.json()).then(res => {
        if (res.flights && res.flights[0]) form.setFieldsValue(res.flights[0]);
      });
    }
  }, [id]);

  interface FlightFormValues {
    flightNumber: string;
    departure: string;
    arrival: string;
    date: string;
  }

  const onFinish = async (values: FlightFormValues) => {
    setLoading(true);
    await fetch('/api/flight/update', {
      method: 'POST',
      body: JSON.stringify({ ...values, id }),
      headers: { 'Content-Type': 'application/json' },
    });
    setLoading(false);
    message.success('修改成功');
    router.push('/flightManage');
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: '#000'  }}>修改航班信息</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="flightNumber" label="航班号" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="departure" label="出发地" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="arrival" label="目的地" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="date" label="起飞时间" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
        </Form.Item>
      </Form>
    </div>
  );
}