import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ExpiryDateTab = () => {
  const [expiryDates, setExpiryDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpiryDates = async () => {
      try {
        const response = await axios.get('/specialty');
        const allExpiryDates = response.data.flatMap(specialty =>
          specialty.expiry_date.map(expiry_date => ({
            ...expiry_date,
            specialtyId: specialty._id, // Thêm trường specialtyId vào expiry date
            specialtyName: specialty.name,
          }))
        );

        setExpiryDates(allExpiryDates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expiry dates:', error);
        setLoading(false);
        message.error('Failed to fetch expiry dates');
      }
    };

    fetchExpiryDates();
  }, []);

  const handleDeleteExpiryDate = async (expiryDateId, specialtyId) => {
    try {
      await axios.delete(`/specialty/${specialtyId}/expiry_date/${expiryDateId}`);
      message.success('Xoá hạn sử dụng thành công');
      setExpiryDates(expiryDates.filter(date => date._id !== expiryDateId));
    } catch (error) {
      console.error('Error deleting expiry date:', error);
      message.error('Failed to delete expiry date');
    }
  };

  const columns = [
    {
      title: 'Tên đặc sản',
      dataIndex: 'specialtyName',
      key: 'specialtyName',
    },
    {
      title: 'Lô sản xuất',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày sản xuất',
      dataIndex: 'production_date',
      key: 'production_date',
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => navigate(`/admin/expirydate/update/${record.specialtyId}/${record._id}`)} />
          <Popconfirm
            title="Bạn có chắc chắn xoá hạn sử dụng này?"
            onConfirm={() => handleDeleteExpiryDate(record._id)}
            okText="có"
            cancelText="không"
          >
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 7,
    showSizeChanger: false,
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => navigate('/admin/expirydate/add')}
        style={{ marginBottom: 16 }}
      >
        Thêm ngày sản xuất
      </Button>
      <Table
        columns={columns}
        dataSource={expiryDates}
        rowKey="_id"
        loading={loading}
        pagination={paginationConfig}
      />
    </div>
  );
};

export default ExpiryDateTab;
