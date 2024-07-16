import React from 'react';
import './Header.css';
import logo from '../../../assets/logo.png';
import backgroundImage from '../../../assets/background.jpg';

const Header = () => {
    return (
        <header className="header" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="header-container">
                <span className="logo-text"> ĐẶC SẢN MIỀN TÂY - NƠI ĐÂY HỘI TỤ</span>
                <img src={logo} alt="Logo" className="logo" />

            </div>
        </header>
    );
};

export default Header;
