import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddMarket = () => {
  const [form] = Form.useForm();
  const [specialties, setSpecialties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialtyNames = async () => {
      try {
        const response = await axios.get('/specialty/names');
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
      await axios.post(`/specialty/${values.specialtyId}/market`, values);
      message.success('Địa điểm bán đã được thêm thành công');
      navigate('/admin/market');
    } catch (error) {
      console.error('Error adding market:', error);
      message.error('Có lỗi xảy ra khi thêm địa điểm bán');
    }
  };

  return (
    <Form
      form={form}
      name="addMarket"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ specialtyId: '', name: '', address: '', price: '', map: '' }}
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
        label="Tên nơi bán"
        rules={[{ required: true, message: 'Vui lòng nhập tên chợ' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Địa chỉ"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Giá trung bình"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="map"
        label="Google Map"
      >
        <Input placeholder="Nhập liên kết Google Map" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%', fontSize: '16px' }}>
          Thêm mới
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddMarket;
