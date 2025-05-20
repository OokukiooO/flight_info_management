'use client';
import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  interface LoginFormValues {
    username: string;
    password: string;
  }

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    const res = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      message.success('登录成功');
      router.push('/dashboard'); // 登录成功跳转dashboard
    } else {
      message.error(data.error || '登录失败');
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '80px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #f0f1f2' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24, fontSize: 32, color: '#000' }}>用户登录</h2>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<LoginOutlined />} loading={loading} block>
            登录
          </Button>
        </Form.Item>
        <Form.Item>
          没有账号？<a href="/regist">去注册</a>
        </Form.Item>
      </Form>
    </div>
  );
}