'use client';
import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserAddOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function RegistPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  interface RegisterFormValues {
    username: string;
    password: string;
  }

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    const res = await fetch('/api/user/register', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      message.success('注册成功，请登录');
      router.push('/login');
    } else {
      message.error(data.error || '注册失败');
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '80px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #f0f1f2' }}>
    <h1 style={{ textAlign: 'center', marginBottom: 24, fontSize: 32, color: '#000' }}>用户注册</h1>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input prefix={<UserAddOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            注册
          </Button>
        </Form.Item>
        <Form.Item>
          已有账号？<a href="/login">去登录</a>
        </Form.Item>
      </Form>
    </div>
  );
}