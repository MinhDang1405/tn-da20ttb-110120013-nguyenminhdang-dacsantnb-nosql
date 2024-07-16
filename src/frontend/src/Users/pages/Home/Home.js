import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { Row, Col, Card, Input, Select } from 'antd';

const { Option } = Select;

const Home = () => {
    const [specialties, setSpecialties] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchProvince, setSearchProvince] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get('/specialty');
                setSpecialties(response.data);
            } catch (error) {
                console.error('Error fetching specialties:', error);
            }
        };

        fetchSpecialties();
    }, []);

    const filteredSpecialties = specialties.filter(specialty =>
        specialty.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        (searchProvince === '' || specialty.province.toLowerCase() === searchProvince.toLowerCase())
    );

    const handleSearch = (value) => {
        setSearchKeyword(value);
    };

    const handleProvinceChange = (value) => {
        setSearchProvince(value);
    };

    const handleCardClick = (specialtyId) => {
        navigate(`/user/specialty/${specialtyId}`);
    };

    
    const provinces = [...new Set(specialties.map(specialty => specialty.province))].sort();

    return (
        <div className="home-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Input.Search
                    placeholder="Nhập tên đặc sản để tìm kiếm"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onSearch={handleSearch}
                    style={{ width: '50%' }}
                />
                <Select
                    placeholder="Chọn tỉnh thành"
                    allowClear
                    style={{ width: '40%' }}
                    onChange={handleProvinceChange}
                >
                    <Option value="">Hiển thị tất cả</Option>
                    {provinces.map(province => (
                        <Option key={province} value={province}>{province}</Option>
                    ))}
                </Select>
            </div>
            <Row gutter={[16, 16]}>
                {filteredSpecialties.map(specialty => (
                    <Col key={specialty._id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={<img alt={specialty.name} src={specialty.img} className="card-image" />}
                            onClick={() => handleCardClick(specialty._id)}
                        >
                            <Card.Meta
                                title={<div className="card-title" style={{ color: '#4CAF50' }}>{specialty.name}</div>}
                                description={<div className="card-description"><strong>Tỉnh thành: {specialty.province}</strong></div>}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;
