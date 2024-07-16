import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const UpdateExpiryDate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { specialtyId, expiryDateId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpiryDate = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/specialty/${specialtyId}/expiry_date/${expiryDateId}`);
        const fetchedExpiryDate = response.data;
        form.setFieldsValue({
          name: fetchedExpiryDate.name,
          production_date: fetchedExpiryDate.production_date,
          expiration_date: fetchedExpiryDate.expiration_date,
        });
      } catch (error) {
        console.error('Error fetching expiry date:', error);
        message.error('Không tìm thấy thông tin ngày hết hạn');
      } finally {
        setLoading(false);
      }
    };

    fetchExpiryDate();
  }, [form, specialtyId, expiryDateId]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.put(`/specialty/${specialtyId}/expiry_date/${expiryDateId}`, values);
      if (response.status === 200) {
        message.success('Thông tin ngày hết hạn đã được cập nhật thành công');
        navigate('/admin/expirydate');
      } else {
        message.error(`Có lỗi xảy ra khi cập nhật ngày hết hạn: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating expiry date:', error);
      message.error(`Có lỗi xảy ra khi cập nhật thông tin ngày hết hạn: ${error.message}`);
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
          label="Tên lô sản xuất"
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày sản xuất"
          name="production_date"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hạn sử dụng"
          name="expiration_date"
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

export default UpdateExpiryDate;
