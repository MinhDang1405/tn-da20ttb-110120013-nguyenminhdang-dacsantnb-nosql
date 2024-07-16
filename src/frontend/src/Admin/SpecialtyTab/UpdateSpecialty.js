import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Upload, message } from 'antd';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';

const UpdateSpecialty = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchSpecialty = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/specialty/${id}`);
        const fetchedSpecialty = response.data;
        form.setFieldsValue({
          name: fetchedSpecialty.name,
          province: fetchedSpecialty.province,
          flavor: fetchedSpecialty.flavor,
          instructions: fetchedSpecialty.instructions,
          food_safety_standard: fetchedSpecialty.food_safety_standard,
        });
        setDescription(fetchedSpecialty.description || ""); 
        setImageBase64(fetchedSpecialty.img);
      } catch (error) {
        console.error('Error fetching specialty:', error);
        message.error('Không tìm thấy thông tin đặc sản');
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialty();
  }, [form, id]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      values.img = imageBase64;
      values.description = description; 
      const response = await axios.put(`/specialty/${id}`, values);
      if (response.status === 200) {
        message.success('Đặc sản đã được cập nhật thành công');
        navigate('/admin/specialty');
      } else {
        message.error(`Có lỗi xảy ra khi cập nhật đặc sản: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating specialty:', error);
      message.error(`Có lỗi xảy ra khi cập nhật đặc sản: ${error.message}`);
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
          label="Tên đặc sản"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên đặc sản!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tỉnh"
          name="province"
          rules={[{ required: true, message: 'Vui lòng nhập tỉnh!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hương vị"
          name="flavor"
          rules={[{ required: true, message: 'Vui lòng nhập hương vị!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
        >
          <CKEditor
            editor={ClassicEditor}
            data={description} 
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data); 
            }}
          />
        </Form.Item>

        <Form.Item
          label="Cách sử dụng"
          name="instructions"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Chứng nhận ATTP"
          name="food_safety_standard"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hình ảnh"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Upload
            listType="picture"
            beforeUpload={(file) => {
              getBase64(file, (imageUrl) => {
                setImageBase64(imageUrl);
              });
              return false; 
            }}
          >
            <Button>Chọn hình ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%', fontSize: '16px' }}>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateSpecialty;
