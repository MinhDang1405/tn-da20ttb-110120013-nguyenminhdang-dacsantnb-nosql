import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddCategory = () => {
  const { specialtyId, categoryId } = useParams();
  const [form] = Form.useForm();
  const [specialties, setSpecialties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialtyNames = async () => {
      try {
        const response = await axios.get(`/specialty/names`);
        setSpecialties(response.data);
      } catch (error) {
        console.error('Error fetching specialty names:', error);
        message.error('Có lỗi xảy ra khi lấy danh sách tên đặc sản');
      }
    };

    fetchSpecialtyNames();
  }, []);

  const onFinish = async (values) => {
    try {
      
      await axios.post(`/specialty/${values.specialtyId}/category`, values); 
      message.success('Danh mục đã được thêm thành công');
      navigate('/admin/category');
    } catch (error) {
      console.error('Error adding category:', error);
      message.error('Có lỗi xảy ra khi thêm danh mục');
    }
  };
  

  return (
    <Form
      form={form}
      name="addCategory"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ specialtyId: '', name: '', specifications: '', storage_method: '', components: '' }}
    >
      <Form.Item
        name="specialtyId"
        label="Đặc sản"
        rules={[{ required: true, message: 'Vui lòng chọn đặc sản' }]}
      >
        <Select placeholder="Chọn đặc sản">
          {specialties.map(specialty => (
            <Option key={specialty._id} value={specialty._id}>{specialty.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="Tên Loại"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="specifications"
        label="Quy cách"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="storage_method"
        label="Phương pháp bảo quản"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="components"
        label="Thành phần"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%', fontSize: '16px' }}>
          Thêm mới
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCategory;
