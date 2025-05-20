'use client';
import { useState } from 'react';
import { Table, Input, Button, Form, } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function FlightSearching() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: '航班号', dataIndex: 'flightNumber', key: 'flightNumber' },
    { title: '出发地', dataIndex: 'departure', key: 'departure' },
    { title: '目的地', dataIndex: 'arrival', key: 'arrival' },
    { title: '起飞时间', dataIndex: 'date', key: 'date' },
  ];

  const onSearch = async () => {
    setLoading(true);
    const values = form.getFieldsValue();
    const params = new URLSearchParams();
    Object.entries(values).forEach(([k, v]) => {
      if (typeof v === 'string' && v) {
        params.append(k, v);
      }
    });
    const res = await fetch('/api/flight/search?' + params.toString());
    const json = await res.json();
    setData(json.flights);
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>航班查询</h2>
      <Form form={form} layout="inline" onFinish={onSearch}>
        <Form.Item name="departure" label="出发地">
          <Input placeholder="出发地" />
        </Form.Item>
        <Form.Item name="arrival" label="目的地">
          <Input placeholder="目的地" />
        </Form.Item>
        <Form.Item name="flightNumber" label="航班号">
          <Input placeholder="航班号" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>查询</Button>
        </Form.Item>
      </Form>
      <Table
        style={{ marginTop: 24 }}
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
}