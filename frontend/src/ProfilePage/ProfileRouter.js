import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Header } from "../components/homepage/Header.js";

const ProfileRouter = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      <Header></Header>
      <div className="bg-gradient-to-t from-slate-50 to-slate-300 h-screen w-full overflow-auto">
        <div className="flex relative mx-auto lg:max-w-6xl lg:h-screen w-full sm:px-10 md:px-12 lg:px-5 overflow-hidden ">
          <div className="static lg:flex items-center justify-center hidden w-64 h-full rounded-none ">
            <Navbar />
          </div>
          <div className="w-full h-full px-6 py-8 lg:h-screen flex flex-col pt-24">
            <div className="relative">
              <button
                id="menu-button"
                className="btn w-full lg:hidden bg-gradient-to-r from-blue-600 to-green-300 text-white border-none"
                onClick={toggleDropdown}
              >
                Navigate
              </button>
              {/* TODO: Close dropdown on navlink select */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 mt-2 rounded shadow-lg">
                  <Navbar></Navbar>
                </div>
              )}
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileRouter;
