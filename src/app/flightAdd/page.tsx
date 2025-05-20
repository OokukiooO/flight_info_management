/*
 * @Description: 
 * @Date: 2025-05-18 20:13:49
 * @LastEditTime: 2025-05-20 23:56:46
 * @FilePath: /flight_info_management/src/app/flightAdd/page.tsx
 */

'use client';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';

export default function FlightAdd() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: unknown) => {
    await fetch('/api/flight/add', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    });
    message.success('添加成功');
    router.push('/flightManage');
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: '#000' }}>添加航班信息</h2>
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
          <Button type="primary" htmlType="submit">添加</Button>
        </Form.Item>
      </Form>
    </div>
  );
}