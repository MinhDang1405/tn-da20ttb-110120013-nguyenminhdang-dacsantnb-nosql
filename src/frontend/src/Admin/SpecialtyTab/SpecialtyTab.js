import React, { useEffect, useState } from 'react';
import { Table, Space, Button, message, Popconfirm } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const SpecialtyTab = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get('/specialty');
        setSpecialties(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching specialties:', error);
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  const deleteMultipleSpecialties = async () => {
    try {
      await axios.post('/specialty/delete-multiple', { ids: selectedRowKeys });
      setSpecialties(specialties.filter((specialty) => !selectedRowKeys.includes(specialty._id)));
      setSelectedRowKeys([]);
      message.success('Đặc sản đã được xóa thành công');
    } catch (error) {
      console.error('Lỗi khi xóa đặc sản:', error);
      message.error('Có lỗi xảy ra khi xóa đặc sản');
    }
  };

  const columns = [
    {
      title: 'Tên đặc sản',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tỉnh',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: 'Hương vị',
      dataIndex: 'flavor',
      key: 'flavor',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <div
          dangerouslySetInnerHTML={{
            __html: text ? (text.length > 100 ? text.substr(0, 100) + '...' : text) : '',
          }}
        />
      ),
    },
    {
      title: 'Cách sử dụng',
      dataIndex: 'instructions',
      key: 'instructions',
    },
    {
      title: 'Chứng nhận ATTP',
      dataIndex: 'food_safety_standard',
      key: 'food_safety_standard',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'img',
      key: 'img',
      render: (text) => (
        <img src={text} alt={text} style={{ width: 50 }} />
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/specialty/update/${record._id}`}>
            <Button type="primary" icon={<EditOutlined />} />
          </Link>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const paginationConfig = {
    pageSize: 3,
    showSizeChanger: false,
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => navigate('/admin/specialty/add')}
        >
          Thêm đặc sản
        </Button>
        {selectedRowKeys.length > 0 && (
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa các đặc sản đã chọn không?"
            onConfirm={deleteMultipleSpecialties}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger" style={{ marginLeft: 8 }}>
              Xóa {selectedRowKeys.length} đặc sản đã chọn
            </Button>
          </Popconfirm>
        )}
      </div>
      <Table 
        rowSelection={rowSelection} 
        columns={columns} 
        dataSource={specialties} 
        rowKey="_id" 
        loading={loading} 
        pagination={paginationConfig} 
      />
    </div>
  );
};

export default SpecialtyTab;
