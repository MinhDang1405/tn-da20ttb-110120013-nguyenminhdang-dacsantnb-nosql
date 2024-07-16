import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddExpiryDate = () => {
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
        message.error('Failed to fetch specialty names');
      }
    };

    fetchSpecialtyNames();
  }, []);

  const onFinish = async (values) => {
    try {
      await axios.post(`/specialty/${values.specialtyId}/expiry_date`, values);
      message.success('Thêm hạn sử dụng thành công');
      navigate('/admin/expirydate');
    } catch (error) {
      console.error('Error adding expiry date:', error);
      message.error('Failed to add expiry date');
    }
  };

  return (
    <Form
      form={form}
      name="addExpiryDate"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ specialtyId: '', name: '', production_date: '', expiration_date: '' }}
    >
      <Form.Item
        name="specialtyId"
        label="Đặc sản"
        rules={[{ required: true, message: 'Please select a specialty' }]}
      >
        <Select placeholder="Select a specialty">
          {specialties.map(specialty => (
            <Option key={specialty._id} value={specialty._id}>{specialty.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="Lô sản xuất"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="production_date"
        label="Ngày sản xuất"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="expiration_date"
        label="Hạn sử dụng"
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

export default AddExpiryDate;
