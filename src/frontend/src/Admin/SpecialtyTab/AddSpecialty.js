import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';

const AddSpecialty = () => {
  const [form] = Form.useForm();
  const [imageBase64, setImageBase64] = useState(null);
  const navigate = useNavigate();

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const handleAddSpecialty = async (values) => {
    try {
      values.img = imageBase64;
      console.log("Sending data:", values); 

      const response = await axios.post('/specialty', values);
      console.log("Server response:", response); 

      if (response.status === 201) {
        message.success({
          content: 'Đặc sản đã được thêm thành công',
          style: { fontSize: '18px', color: 'green' }
        });
        form.resetFields();
        navigate('/admin/specialty'); 
      } else {
        message.error({
          content: `Có lỗi xảy ra khi thêm đặc sản: ${response.statusText}`,
          style: { fontSize: '18px', color: 'red' }
        });
      }
    } catch (error) {
      console.error('Error adding specialty:', error);
      message.error({
        content: `Có lỗi xảy ra khi thêm đặc sản: ${error.message}`,
        style: { fontSize: '18px', color: 'red' }
      });
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.file.status === 'done') {
      getBase64(e.file.originFileObj, (imageUrl) => {
        setImageBase64(imageUrl);
      });
    }
    return e && e.fileList;
  };

  return (
    <div className="add-specialty-container">
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="name"
          label="Tên đặc sản"
          rules={[{ required: true, message: 'Vui lòng nhập tên đặc sản!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="province"
          label="Tỉnh"
          rules={[{ required: true, message: 'Vui lòng nhập tỉnh!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="flavor"
          label="Hương vị"
          rules={[{ required: true, message: 'Vui lòng nhập hương vị!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
        >
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              const data = editor.getData();
              form.setFieldsValue({ description: data });
            }}
          />
        </Form.Item>
        <Form.Item
          name="instructions"
          label="Cách sử dụng"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="food_safety_standard"
          label="Chứng nhận ATTP"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={(file) => {
              getBase64(file, (imageUrl) => {
                setImageBase64(imageUrl);
              });
              return false; 
            }}
          >
            {imageBase64 ? (
              <img src={imageBase64} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  handleAddSpecialty(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
            style={{ width: '100%', fontSize: '16px' }}
          >
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSpecialty;
