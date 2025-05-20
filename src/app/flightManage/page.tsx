'use client';
import { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function FlightManage() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const fetchData = () => {
    fetch('/api/flight/search').then(res => res.json()).then(res => setData(res.flights));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: number) => {
    await fetch('/api/flight/delete', { method: 'POST', body: JSON.stringify({ id }) });
    message.success('删除成功');
    fetchData();
  };

interface Flight {
    id: number;
    flightNumber: string;
    departure: string;
    arrival: string;
    date: string;
    [key: string]: unknown;
}

interface ColumnType {
    title: string;
    dataIndex?: string;
    key: string;
    render?: (value: unknown, record: Flight, index: number) => React.ReactNode;
}

const columns: ColumnType[] = [
    { title: '航班号', dataIndex: 'flightNumber', key: 'flightNumber' },
    { title: '出发地', dataIndex: 'departure', key: 'departure' },
    { title: '目的地', dataIndex: 'arrival', key: 'arrival' },
    { title: '起飞时间', dataIndex: 'date', key: 'date' },
    {
        title: '操作',
        key: 'action',
        render: (_: unknown, record: Flight) => (
            <>
                <Button
                    icon={<EditOutlined />}
                    onClick={() => router.push(`/flightEdit?id=${record.id}`)}
                    style={{ marginRight: 8 }}
                />
                <Popconfirm title="确定删除？" onConfirm={() => handleDelete(record.id)}>
                    <Button icon={<DeleteOutlined />} danger />
                </Popconfirm>
            </>
        ),
    },
];

  return (
    <div>
      <h2 style={{ marginBottom: 24, color: '#000'  }}>航班管理</h2>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
}