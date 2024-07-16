import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Home from '../pages/Home/Home';
import Introduce from '../pages/Introduce/Introduce';
import SpecialtyDetail from '../pages/SpecialtyDetail/SpecialtyDetail';

const UserLayout = () => {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolledToBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;
            setShowFooter(scrolledToBottom);
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div style={{ paddingBottom: showFooter ? '60px' : '0', minHeight: '100vh', position: 'relative' }}>
            <Navbar />
            <Header />
            <div className="content" style={{ marginBottom: '20px' }}>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/introduce" element={<Introduce />} />
                    <Route path="/specialty/:specialtyId" element={<SpecialtyDetail />} />
                </Routes>
            </div>
            {showFooter && <Footer className="footer" />}
        </div>
    );
};

export default UserLayout;
