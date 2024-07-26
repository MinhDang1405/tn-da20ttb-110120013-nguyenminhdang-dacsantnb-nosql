import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { Row, Col, Card, Input, Select, Pagination } from 'antd';

const { Option } = Select;

const Home = () => {
    const [specialties, setSpecialties] = useState([]);
    const [topSpecialties, setTopSpecialties] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchProvince, setSearchProvince] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const pageSize = 8; // Số lượng đặc sản mỗi trang
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get('/specialty');
                setSpecialties(response.data);
                setTotalItems(response.data.length); // Đặt tổng số đặc sản
            } catch (error) {
                console.error('Error fetching specialties:', error);
            }
        };

        fetchSpecialties();
    }, []);

    useEffect(() => {
        const fetchTopSpecialties = async () => {
            try {
                const response = await axios.get('/specialty/specialties/top');
                setTopSpecialties(response.data);
            } catch (error) {
                console.error('Error fetching top specialties:', error);
            }
        };

        fetchTopSpecialties();
    }, []);

    useEffect(() => {
        // Cập nhật tổng số mục và trang hiện tại sau khi tìm kiếm hoặc lọc
        const filtered = specialties.filter(specialty =>
            specialty.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
            (searchProvince === '' || specialty.province.toLowerCase() === searchProvince.toLowerCase()) &&
            (searchCategory === '' || (specialty.category && specialty.category.some(cat => cat.name.toLowerCase() === searchCategory.toLowerCase())))
        );

        setTotalItems(filtered.length);
        setCurrentPage(1); // Đặt lại trang hiện tại về 1 khi tìm kiếm hoặc lọc
    }, [searchKeyword, searchProvince, searchCategory, specialties]);

    // Lọc và phân trang
    const filteredSpecialties = specialties.filter(specialty =>
        specialty.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        (searchProvince === '' || specialty.province.toLowerCase() === searchProvince.toLowerCase()) &&
        (searchCategory === '' || (specialty.category && specialty.category.some(cat => cat.name.toLowerCase() === searchCategory.toLowerCase())))
    );

    // Tính toán các chỉ số trang
    const startIndex = (currentPage - 1) * pageSize;
    const currentSpecialties = filteredSpecialties.slice(startIndex, startIndex + pageSize);

    const handleSearch = (value) => {
        setSearchKeyword(value);
    };

    const handleProvinceChange = (value) => {
        setSearchProvince(value);
    };

    const handleCategoryChange = (value) => {
        setSearchCategory(value);
    };

    const handleCardClick = (specialtyId) => {
        navigate(`/user/specialty/${specialtyId}`);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const provinces = [...new Set(specialties.map(specialty => specialty.province))].sort((a, b) => a.localeCompare(b, 'vi', { sensitivity: 'base' }));
    const sortedCategories = [...new Set(
        specialties.flatMap(specialty =>
            specialty.category ? specialty.category.map(cat => cat.name) : []
        )
    )].sort((a, b) => a.localeCompare(b, 'vi', { sensitivity: 'base' }));

    // Kiểm tra xem có điều kiện lọc nào không
    const hasFilter = searchKeyword || searchProvince || searchCategory;

    return (
        <div className="home-container">
            {/* Mục Tìm Kiếm */}
            <div className="search-section">
                <h2 className="section-title">Tìm Kiếm Đặc Sản</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Input.Search
                        placeholder="Nhập tên đặc sản để tìm kiếm"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onSearch={handleSearch}
                        style={{ width: '30%' }}
                    />
                    <Select
                        placeholder="Chọn tỉnh thành"
                        allowClear
                        style={{ width: '30%' }}
                        onChange={handleProvinceChange}
                    >
                        <Option value="">Hiển thị tất cả</Option>
                        {provinces.map(province => (
                            <Option key={province} value={province}>{province}</Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Chọn danh mục"
                        allowClear
                        showSearch
                        style={{ width: '30%' }}
                        onChange={handleCategoryChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        <Option value="">Hiển thị tất cả</Option>
                        {sortedCategories.map(category => (
                            <Option key={category} value={category}>{category}</Option>
                        ))}
                    </Select>
                </div>
            </div>

            {/* Đặc Sản Nổi Bật */}
            {!hasFilter && (
                <div className="highlighted-specialties" style={{ marginBottom: 16 }}>
                    <h2 className="section-title">Đặc Sản Nổi Bật</h2>
                    <Row gutter={[16, 16]}>
                        {topSpecialties.length > 0 ? (
                            topSpecialties.map(specialty => (
                                <Col key={specialty._id} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        hoverable
                                        cover={<img alt={specialty.name} src={specialty.img} className="card-image" />}
                                        onClick={() => handleCardClick(specialty._id)}
                                    >
                                        <Card.Meta
                                            title={
                                                <div>
                                                    <div className="card-title" style={{ color: '#4CAF50' }}>{specialty.name}</div>
                                                </div>
                                            }
                                            description={
                                                <div>
                                                    <strong>Tỉnh thành: {specialty.province}</strong>
                                                    <div className="card-views">Lượt xem: {specialty.viewCount}</div>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col span={24}>
                                <div style={{ textAlign: 'center' }}>Không có đặc sản nổi bật</div>
                            </Col>
                        )}
                    </Row>
                </div>
            )}

            {/* Danh Sách Tất Cả Đặc Sản */}
            <div className="all-specialties">
                <h2 className="section-title">Danh Sách Tất Cả Đặc Sản</h2>
                <Row gutter={[16, 16]}>
                    {currentSpecialties.map(specialty => (
                        <Col key={specialty._id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                cover={<img alt={specialty.name} src={specialty.img} className="card-image" />}
                                onClick={() => handleCardClick(specialty._id)}
                            >
                                <Card.Meta
                                    title={
                                        <div>
                                            <div className="card-title" style={{ color: '#4CAF50' }}>{specialty.name}</div>
                                            
                                        </div>
                                    }
                                    description={
                                        <div>
                                            <strong>Tỉnh thành: {specialty.province}</strong>
                                            <div className="card-views">Lượt xem: {specialty.viewCount}</div>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalItems}
                    onChange={handlePageChange}
                    style={{ marginTop: 16, textAlign: 'center' }}
                />
            </div>
        </div>
    );
};

export default Home;
