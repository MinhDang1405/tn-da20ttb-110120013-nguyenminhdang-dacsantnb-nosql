import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const UpdateCategory = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { specialtyId, categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/specialty/${specialtyId}/category/${categoryId}`);
        const fetchedCategory = response.data;
        form.setFieldsValue({
          name: fetchedCategory.name,
          specifications: fetchedCategory.specifications,
          storage_method: fetchedCategory.storage_method,
          components: fetchedCategory.components,
        });
      } catch (error) {
        console.error('Error fetching category:', error);
        message.error('Không tìm thấy thông tin danh mục');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [form, specialtyId, categoryId]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.put(`/specialty/${specialtyId}/category/${categoryId}`, values);
      if (response.status === 200) {
        message.success('Thông tin danh mục đã được cập nhật thành công');
        navigate('/admin/category');
      } else {
        message.error(`Có lỗi xảy ra khi cập nhật danh mục: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      message.error(`Có lỗi xảy ra khi cập nhật thông tin danh mục: ${error.message}`);
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
          label="Tên Loại"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quy cách"
          name="specifications"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Phương pháp bảo quản"
          name="storage_method"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Thành phần"
          name="components"
        >
          <Input.TextArea />
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

export default UpdateCategory;
