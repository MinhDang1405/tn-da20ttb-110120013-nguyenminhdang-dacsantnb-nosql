import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const UpdateMarket = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { specialtyId, marketId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/specialty/${specialtyId}/market/${marketId}`);
        const fetchedMarket = response.data;
        form.setFieldsValue({
          name: fetchedMarket.name,
          address: fetchedMarket.address,
          price: fetchedMarket.price,
          map: fetchedMarket.map, // Thêm trường map vào giá trị form
        });
      } catch (error) {
        console.error('Error fetching market:', error);
        message.error('Không tìm thấy thông tin chợ');
      } finally {
        setLoading(false);
      }
    };

    fetchMarket();
  }, [form, specialtyId, marketId]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.put(`/specialty/${specialtyId}/market/${marketId}`, values);
      if (response.status === 200) {
        message.success('Thông tin chợ đã được cập nhật thành công');
        navigate('/admin/market');
      } else {
        message.error(`Có lỗi xảy ra khi cập nhật chợ: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating market:', error);
      message.error(`Có lỗi xảy ra khi cập nhật thông tin chợ: ${error.message}`);
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
          label="Tên nơi bán"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên chợ!' }]}
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
          label="Giá trung bình"
          name="price"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Google Map"
          name="map"
        >
          <Input placeholder="Nhập liên kết Google Map" />
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

export default UpdateMarket;
