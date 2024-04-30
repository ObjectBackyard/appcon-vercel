import React, { useEffect, useState } from 'react';
import { Route, Routes, NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';

const ProfileTransactions = () => {
  const [inboundTransactions, setInboundTransactions] = useState([]);
  const [outboundTransactions, setOutboundTransactions] = useState([]);
  
  useEffect(() => {
    axios.get('https://akap-api.vercel.app/api/get-inbound-transactions')
    .then((res) => {
        console.log(res.data);
      }   
    )
  });

  const activeLink = 'active relative tracking-[1px] mb-4 text-green-600 after:content-[""] after:bg-green-600 after:h-[3px] after:w-[100%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute';
  const inactiveLink = 'relative tracking-[1px] mb-4 hover:text-green-600 after:content-[""] after:bg-green-600 after:h-[3px] after:w-[0%] after:left-0 after:-bottom-[5px] after:rounded-xl after:absolute after:duration-300 hover:after:w-[100%]';
  

  return (
    <>
        <h1 className='text-3xl my-3 text-blue-600'> Transactions </h1>
        <div className="flex gap-8">
          <NavLink className={({ isActive }) => isActive ? activeLink: inactiveLink} to="/profile/transactions/received"> Received </NavLink>
          <NavLink className={({ isActive }) => isActive ? activeLink: inactiveLink} to="/profile/transactions/donated"> Donated </NavLink>
        </div>
        <div className='rounded-box p-8 h-fit w-full shadow bg-white overflow-x-auto'>
          <Outlet></Outlet>
        </div>
    </>
  )
}

export default ProfileTransactions
