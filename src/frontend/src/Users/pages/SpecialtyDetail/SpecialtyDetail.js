import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Card } from 'antd';
import parse from 'html-react-parser';
import './SpecialtyDetail.css';

const { Title, Paragraph, Link } = Typography;

const SpecialtyDetail = () => {
    const { specialtyId } = useParams();
    const [specialty, setSpecialty] = useState(null);
    const [loading, setLoading] = useState(true); // Thêm state để theo dõi trạng thái tải
    const specialtyRef = useRef(null);

    useEffect(() => {
        const fetchSpecialty = async () => {
            try {
                // Gửi yêu cầu lấy thông tin đặc sản
                const response = await axios.get(`/specialty/${specialtyId}`);
                setSpecialty(response.data);

                // Gửi yêu cầu tăng số lượt xem
                await axios.patch(`/specialties/increment-view/${specialtyId}`);

                // Cập nhật trạng thái tải
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin đặc sản:', error);
                setLoading(false); // Cập nhật trạng thái tải khi có lỗi
            }
        };

        fetchSpecialty();
    }, [specialtyId]);

    useEffect(() => {
        if (specialtyRef.current) {
            specialtyRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [specialtyId]);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (!specialty) {
        return <div>Không tìm thấy thông tin đặc sản.</div>; // Thêm thông báo lỗi khi không có dữ liệu
    }

    return (
        <div className="specialty-detail-container">
            <div ref={specialtyRef}></div>
            <Card>
                <div className="detail-content">
                    <img alt={specialty.name} src={specialty.img} className="detail-image" />
                    <div className="detail-meta">
                        <Title level={2}>{specialty.name}</Title>
                        <Title level={3} className="specialty-type">
                            {specialty.category && specialty.category.map(cat => cat.name).join(', ') || 'Không có loại'}
                        </Title>
                        <div className="meta-info">
                            <Paragraph className="paragraph"><strong>Tỉnh thành:</strong> {specialty.province}</Paragraph>
                            <Paragraph className="paragraph"><strong>Hương vị:</strong> {specialty.flavor}</Paragraph>
                            <Paragraph className="paragraph"><strong>Cách sử dụng:</strong> {specialty.instructions}</Paragraph>
                            <Paragraph className="paragraph"><strong>Chứng nhận an toàn thực phẩm:</strong> {specialty.food_safety_standard}</Paragraph>
                        </div>
                    </div>
                </div>
            </Card>
            <Card title="Thông tin loại đặc sản">
                {specialty.category && specialty.category.map(category => (
                    <div key={category._id}>
                        <Paragraph className="paragraph"><strong>Loại:</strong> {category.name}</Paragraph>
                        <Paragraph className="paragraph"><strong>Quy cách:</strong> {category.specifications}</Paragraph>
                        <Paragraph className="paragraph"><strong>Cách bảo quản:</strong> {category.storage_method}</Paragraph>
                        <Paragraph className="paragraph"><strong>Thành phần:</strong> {category.components}</Paragraph>
                    </div>
                ))}
            </Card>
            <Card title="Mô tả">
                <Paragraph className="paragraph">{parse(specialty.description)}</Paragraph>
            </Card>
            <Card title="Thời hạn sử dụng">
                {specialty.expiry_date && specialty.expiry_date.map(expiry_date => (
                    <div key={expiry_date._id}>
                        <Paragraph className="paragraph"><strong>Lô sản xuất:</strong> {expiry_date.name}</Paragraph>
                        <Paragraph className="paragraph"><strong>Ngày sản xuất:</strong> {expiry_date.production_date}</Paragraph>
                        <Paragraph className="paragraph"><strong>Hạn sử dụng:</strong> {expiry_date.expiration_date}</Paragraph>
                    </div>
                ))}
            </Card>
            <Card title="Nơi bán">
                {specialty.market && specialty.market.map(market => (
                    <div key={market._id}>
                        <Paragraph className="paragraph"><strong>Tên nơi bán:</strong> {market.name} - {market.address} - {market.price}</Paragraph>
                        {market.map && (
                          <Paragraph className="paragraph">
                              <strong>Bản đồ:</strong> <Link href={market.map} target="_blank">Xem chi tiết địa chỉ</Link>
                          </Paragraph>
                        )}
                    </div>
                ))}
            </Card>
            <Card title="Thông tin nhà sản xuất">
                {specialty.manufacturer && specialty.manufacturer.map(manufacturer => (
                    <div key={manufacturer._id}>
                        <Paragraph className="paragraph"><strong>Nhà sản xuất:</strong> {manufacturer.name}</Paragraph>
                        <Paragraph className="paragraph"><strong>Địa chỉ:</strong> {manufacturer.address}</Paragraph>
                        <Paragraph className="paragraph"><strong>Liên hệ:</strong> {manufacturer.contact}</Paragraph>
                    </div>
                ))}
            </Card>
        </div>
    );
};

export default SpecialtyDetail;
