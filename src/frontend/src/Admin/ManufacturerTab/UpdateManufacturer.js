import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const UpdateManufacturer = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { specialtyId, manufacturerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManufacturer = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/specialty/${specialtyId}/manufacturer/${manufacturerId}`);
        const fetchedManufacturer = response.data;
        form.setFieldsValue({
          name: fetchedManufacturer.name,
          address: fetchedManufacturer.address,
          contact: fetchedManufacturer.contact,
        });
      } catch (error) {
        console.error('Error fetching manufacturer:', error);
        message.error('Không tìm thấy thông tin nhà sản xuất');
      } finally {
        setLoading(false);
      }
    };

    fetchManufacturer();
  }, [form, specialtyId, manufacturerId]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.put(`/specialty/${specialtyId}/manufacturer/${manufacturerId}`, values);
      if (response.status === 200) {
        message.success('Thông tin nhà sản xuất đã được cập nhật thành công');
        navigate('/admin/manufacturer');
      } else {
        message.error(`Có lỗi xảy ra khi cập nhật nhà sản xuất: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating manufacturer:', error);
      message.error(`Có lỗi xảy ra khi cập nhật thông tin nhà sản xuất: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Tên nhà sản xuất"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên nhà sản xuất!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Liên hệ"
          name="contact"
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%', fontSize: '16px' }}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateManufacturer;

       
