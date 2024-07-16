import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoryTab = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/specialty');
        const allCategories = response.data.flatMap(specialty => 
          specialty.category.map(cat => ({
            ...cat,
            specialtyId: specialty._id, // Thêm trường specialtyId vào danh mục
            specialtyName: specialty.name
          }))
        );

        setCategories(allCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId, specialtyId) => { 
    try {
      await axios.delete(`/specialty/${specialtyId}/category/${categoryId}`); 
      message.success('Đã xoá danh mục thành công');
      setCategories(categories.filter(cat => cat._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
      message.error('Có lỗi xảy ra khi xoá danh mục');
    }
  };

  const columns = [
    {
      title: 'Tên đặc sản',
      dataIndex: 'specialtyName',
      key: 'specialtyName',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quy cách',
      dataIndex: 'specifications',
      key: 'specifications',
      render: (specifications) => (
        <ul>
          {specifications ? specifications.split(',').map((spec, index) => (
            <li key={index}>{spec}</li>
          )) : null}
        </ul>
      ),
    },
    {
      title: 'Phương pháp bảo quản',
      dataIndex: 'storage_method',
      key: 'storage_method',
      render: (storageMethods) => (
        <ul>
          {storageMethods ? storageMethods.split(',').map((method, index) => (
            <li key={index}>{method}</li>
          )) : null}
        </ul>
      ),
    },
    
    {
      title: 'Thành phần',
      dataIndex: 'components',
      key: 'components',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => navigate(`/admin/category/update/${record.specialtyId}/${record._id}` )}></Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá danh mục này không?"
            onConfirm={() => handleDeleteCategory(record._id, record.specialtyId)} 
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
        onClick={() => navigate('/admin/category/add')}
        style={{ marginBottom: 16 }}
      >
        Thêm loại cho đặc sản
      </Button>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="_id"
        loading={loading}
        pagination={paginationConfig}
      />
    </div>
  );
};

export default CategoryTab;
