import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, PlusOutlined, AppstoreOutlined, TeamOutlined, ShoppingOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link, Routes, Route } from 'react-router-dom';
import HomeTab from './HomeTab/HomeTab';
import SpecialtyTab from './SpecialtyTab/SpecialtyTab';
import AddSpecialty from './SpecialtyTab/AddSpecialty';
import UpdateSpecialty from './SpecialtyTab/UpdateSpecialty';
import CategoryTab from './CategoryTab/CategoryTab';
import AddCategory from './CategoryTab/AddCategory';
import UpdateCategory from './CategoryTab/UpdateCategory';
import ManufacturerTab from './ManufacturerTab/ManufacturerTab';
import AddManufacturer from './ManufacturerTab/AddManufacturer';
import UpdateManufacturer from './ManufacturerTab/UpdateManufacturer';
import ExpiryDateTab from './ExpiryDateTab/ExpiryDateTab';
import AddExpiryDate from './ExpiryDateTab/AddExpiryDate';
import UpdateExpiryDate from './ExpiryDateTab/UpdateExpiryDate';
import MarketTab from './MarketTab/MarketTab'; 
import AddMarket from './MarketTab/AddMarket'; 
import UpdateMarket from './MarketTab/UpdateMarket';
import StatsPage from './StatsPageTab/StatsPage' 

import './AdminLayout.css';

const { Sider, Content } = Layout;

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={toggleCollapsed} 
        width={250}
      >
        <div className="navbar-title">TNB</div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/admin/home">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusOutlined />}>
            <Link to="/admin/specialty">Quản lý đặc sản</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />}>
            <Link to="/admin/category">Quản lý loại đặc sản</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            <Link to="/admin/manufacturer">Quản lý nhà sản xuất</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<CalendarOutlined />}>
            <Link to="/admin/expirydate">Quản lý hạn sử dụng</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<ShoppingOutlined />}>
            <Link to="/admin/market">Quản lý địa điểm bán</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content className="admin-content">
          <div className="tab-content">
            <Routes>
              <Route path="home" element={<HomeTab />} />
              <Route path="specialty" element={<SpecialtyTab />} />
              <Route path="specialty/add" element={<AddSpecialty />} />
              <Route path="specialty/update/:id" element={<UpdateSpecialty />} />
              <Route path="category" element={<CategoryTab />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="category/update/:specialtyId/:categoryId" element={<UpdateCategory />} />
              <Route path="manufacturer" element={<ManufacturerTab />} />
              <Route path="manufacturer/add" element={<AddManufacturer />} />
              <Route path="manufacturer/update/:specialtyId/:manufacturerId" element={<UpdateManufacturer />} />
              <Route path="expirydate" element={<ExpiryDateTab />} />
              <Route path="expirydate/add" element={<AddExpiryDate />} />
              <Route path="expirydate/update/:specialtyId/:expiryDateId" element={<UpdateExpiryDate />} />
              <Route path="market" element={<MarketTab />} /> 
              <Route path="market/add" element={<AddMarket />} /> 
              <Route path="market/update/:specialtyId/:marketId" element={<UpdateMarket />} />
              <Route path="stats" element={<StatsPage/>} /> 
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
