import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManufacturerTab = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await axios.get('/specialty');
        const allManufacturers = response.data.flatMap(specialty =>
          specialty.manufacturer.map(manufacturer => ({
            ...manufacturer,
            specialtyId: specialty._id, // Thêm trường specialtyId vào nhà sản xuất
            specialtyName: specialty.name,
            contact: manufacturer.contact || '', // Sử dụng giá trị mặc định nếu contact là undefined
          }))
        );

        setManufacturers(allManufacturers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
        setLoading(false);
        message.error('Có lỗi xảy ra khi lấy danh sách nhà sản xuất');
      }
    };

    fetchManufacturers();
  }, []);

  const handleDeleteManufacturer = async (manufacturerId, specialtyId) => {
    try {
      await axios.delete(`/specialty/${specialtyId}/manufacturer/${manufacturerId}`);
      message.success('Đã xoá nhà sản xuất thành công');
      setManufacturers(manufacturers.filter(manufacturer => manufacturer._id !== manufacturerId));
    } catch (error) {
      console.error('Error deleting manufacturer:', error);
      if (error.response) {
        // Server trả về một phản hồi với mã lỗi
        message.error(error.response.data.message || 'Có lỗi xảy ra khi xoá nhà sản xuất');
      } else {
        // Không nhận được phản hồi từ server
        message.error('Không thể kết nối tới server');
      }
    }
  };

  const columns = [
    {
      title: 'Tên đặc sản',
      dataIndex: 'specialtyName',
      key: 'specialtyName',
    },
    {
      title: 'Tên nhà sản xuất',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Liên hệ',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => navigate(`/admin/manufacturer/update/${record.specialtyId}/${record._id}`)}></Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá danh mục này không?"
            onConfirm={() => handleDeleteManufacturer(record._id, record.specialtyId)} // Truyền specialtyId khi gọi hàm handleDeleteCategory
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
    pageSize: 5,
    showSizeChanger: false,
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => navigate('/admin/manufacturer/add')}
        style={{ marginBottom: 16 }}
      >
        Thêm nhà sản xuất
      </Button>
      <Table
        columns={columns}
        dataSource={manufacturers}
        rowKey="_id"
        loading={loading}
        pagination={paginationConfig}
      />
    </div>
  );
};

export default ManufacturerTab;
