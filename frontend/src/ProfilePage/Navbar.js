import React from 'react'
import "./Navbar.css"
import { NavLink, useLocation} from 'react-router-dom';

const Navbar = () => {
    const activeLink = 'active';
    const inactiveLink = 'text-gray-900';

    const location = useLocation();

    const transactionActive = (match, location) => {
        return location.pathname.startsWith('/profile/transactions');
      };
    

    return (
        <>
        <div>
            <ul className="menu menu-lg w-56 rounded-box m-auto">
                <li><NavLink className={({ isActive }) => isActive ? activeLink: inactiveLink} to="/profile/myprofile"> Profile </NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? activeLink: inactiveLink} to="/profile/user-causes"> Causes </NavLink></li>
                <li><NavLink className={transactionActive(null, location) ? activeLink : inactiveLink} to="/profile/transactions/received"> Transactions </NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? activeLink: inactiveLink} to="/profile/settings"> Settings </NavLink></li>
            </ul>
        </div>
        </>

  )
}

export default Navbar
