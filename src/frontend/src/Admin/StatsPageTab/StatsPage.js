import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Row, Typography, Spin } from 'antd';

const { Title } = Typography;

const StatsPage = () => {
    const [totalViews, setTotalViews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalViews = async () => {
            try {
                const response = await axios.get('/specialty/specialty/totalviews');
                setTotalViews(response.data.totalViews);
            } catch (error) {
                console.error('Error fetching total views:', error);
                setError('Không thể lấy dữ liệu tổng số lượt xem.');
            } finally {
                setLoading(false);
            }
        };

        fetchTotalViews();
    }, []);

    if (loading) {
        return <Spin size="large" />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Thống Kê Lượt Xem</Title>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Tổng số lượt xem đặc sản" bordered={false}>
                        <Title level={3}>{totalViews !== null ? totalViews : 0}</Title>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StatsPage;
