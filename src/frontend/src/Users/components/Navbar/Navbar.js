import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink to="/user/introduce" activeClassName="active">Giới thiệu</NavLink>
            <NavLink exact to="/user/home" activeClassName="active">Trang chủ</NavLink>
            
        </nav>
    );
};

export default Navbar;
