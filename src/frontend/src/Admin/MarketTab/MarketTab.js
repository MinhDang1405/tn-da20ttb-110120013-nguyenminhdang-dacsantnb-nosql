import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MarketTab = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await axios.get('/specialty');
        const allMarkets = response.data.flatMap(specialty => 
          specialty.market.map(market => ({
            ...market,
            specialtyId: specialty._id, // Thêm trường specialtyId vào market
            specialtyName: specialty.name
          }))
        );

        setMarkets(allMarkets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching markets:', error);
        setLoading(false);
        message.error('Có lỗi xảy ra khi lấy danh sách chợ');
      }
    };

    fetchMarkets();
  }, []);

  const handleDeleteMarket = async (marketId, specialtyId) => {
    try {
      await axios.delete(`/specialty/${specialtyId}/market/${marketId}`);
      message.success('Đã xoá địa điểm bán thành công');
      setMarkets(markets.filter(market => market._id !== marketId));
    } catch (error) {
      console.error('Error deleting market:', error);
      message.error('Có lỗi xảy ra khi xoá địa điểm bán');
    }
  };

  const columns = [
    {
      title: 'Tên đặc sản',
      dataIndex: 'specialtyName',
      key: 'specialtyName',
    },
    {
      title: 'Tên nơi bán',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Giá trung bình',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => navigate(`/admin/market/update/${record.specialtyId}/${record._id}`)} />
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá địa điểm bán này không?"
            onConfirm={() => handleDeleteMarket(record._id, record.specialtyId)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const paginationConfig = {
    pageSize: 6,
    showSizeChanger: false,
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => navigate('/admin/market/add')}
        style={{ marginBottom: 16 }}
      >
        Thêm địa điểm bán
      </Button>
      <Table
        columns={columns}
        dataSource={markets}
        rowKey="_id"
        loading={loading}
        pagination={paginationConfig}
      />
    </div>
  );
};

export default MarketTab;
