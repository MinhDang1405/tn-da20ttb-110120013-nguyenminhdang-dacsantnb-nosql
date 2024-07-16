import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddManufacturer = () => {
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
      // Gửi yêu cầu API để thêm mới nhà sản xuất
      await axios.post(`/specialty/${values.specialtyId}/manufacturer`, values);
      message.success('Nhà sản xuất đã được thêm thành công');
      navigate('/admin/manufacturer');
    } catch (error) {
      console.error('Error adding manufacturer:', error);
      message.error('Có lỗi xảy ra khi thêm nhà sản xuất');
    }
  };
  

  return (
    <Form
      form={form}
      name="addManufacturer"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ specialtyId: '', name: '', address: '', contact: '' }}
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
        label="Tên nhà sản xuất"
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
        name="contact"
        label="Liên hệ"
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

export default AddManufacturer;
